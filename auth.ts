// src/auth.ts (o donde lo tengas)
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { db } from './lib/db';

export const TOKEN_MAX_AGE = 15 * 60; //esta puesto 15 minutos de inactividad

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(db),
	callbacks: {
		async session({ session, token }) {
			// mantengo tu lógica
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
				// La sesión ha expirado por inactividad
				return null;
			}

			// Si estamos dentro del tiempo límite, actualizamos lastActivity
			// Esto "refresca" el token con cada interacción
			token.lastActivity = now;

			return token;
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: TOKEN_MAX_AGE, // mantener consistente
	},
	...authConfig,
});
