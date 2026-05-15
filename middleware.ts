// middleware.ts
// ⚠️ IMPORTANTE: importar desde auth.config (sin Prisma/bcryptjs) para mantener
// el bundle del Edge Runtime bajo el límite de 1MB de Vercel.
import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;

	// Permite acceso a assets, auth api y root
	if (nextUrl.pathname.startsWith('/api/auth')) return;
	if (nextUrl.pathname === '/') return;

	// Si no hay sesión válida → redirige a /
	if (!req.auth) {
		const url = nextUrl.clone();
		url.pathname = '/';
		return NextResponse.redirect(url);
	}

	// Si hay sesión, continuar
	return;
});

// Protege todo excepto _next, ficheros estáticos y /api/auth
export const config = {
	matcher: [
		'/((?!_next|.*\\..*|api/auth).*)',
	],
};
