// auth.ts
// Este archivo corre en Node.js runtime, puede usar Prisma, bcryptjs, etc.
// ⚠️ NO importar authConfig aquí con spread: sobrescribiría providers con la versión Edge vacía.
// authConfig solo se usa en middleware.ts
import bcryptjs from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from './lib/db';
import { getUserByEmail } from './data/user';
import { signInSchema } from './lib/schemas/singIn';

export const TOKEN_MAX_AGE = 15 * 60; // 15 minutos de inactividad

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = signInSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const user = await getUserByEmail(email);

					if (!user || !user.password) return null;

					const passwordsMatch = await bcryptjs.compare(
						password,
						user.password
					);

					if (passwordsMatch) {
						return {
							id: String(user.id),
							name: user.name,
							email: user.email,
							isAdmin: user.isAdmin,
						};
					}
				}
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) session.user.id = token.sub;
			return session;
		},
		async jwt({ token, user }) {
			const now = Math.floor(Date.now() / 1000);

			// Si es el primer sign-in, inicializamos lastActivity
			if (user) {
				token.lastActivity = now;
				return token;
			}

			// Si no hay lastActivity (token corrupto), invalidamos
			if (!token.lastActivity) {
				return null;
			}

			// Verificamos si ha pasado más tiempo que TOKEN_MAX_AGE desde la última actividad
			const timeSinceLastActivity = now - Number(token.lastActivity);

			if (timeSinceLastActivity > TOKEN_MAX_AGE) {
				return null;
			}

			// Si estamos dentro del tiempo límite, actualizamos lastActivity
			token.lastActivity = now;
			return token;
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: TOKEN_MAX_AGE,
	},
});
