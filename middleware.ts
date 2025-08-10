// middleware.ts
import { auth } from '@/auth'; // ajusta la ruta a donde exportes `auth`
import { NextResponse } from 'next/server';

// export default auth as middleware
export default auth((req) => {
	const { nextUrl } = req;

	// permite acceso a assets / auth api / root si lo deseas
	if (nextUrl.pathname.startsWith('/api/auth')) return;
	if (nextUrl.pathname === '/') return;

	// si no hay sesión válida -> redirige a /
	if (!req.auth) {
		const url = nextUrl.clone();
		url.pathname = '/';
		return NextResponse.redirect(url);
	}

	// si hay sesión, seguir
	return;
});

// matcher: ajustar a las rutas que quieras proteger
export const config = {
	matcher: [
		'/((?!_next|.*\\..*|api/auth).*)', // ejemplo: protege todo menos _next, ficheros estáticos y /api/auth
	],
};
