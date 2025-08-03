import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { db } from './lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(db),
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) session.user.id = token.sub;
			return session;
		},
		async jwt({ token }) {
			// console.log({ token });
			return token;
		},
	},
	// Configuración de la sesión
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60, // 1 hora en segundos - La sesión expirará después de 1 hora de inactividad
		// updateAge: 60 * 15, // 15 minutos en segundos
	},
	...authConfig,
});
