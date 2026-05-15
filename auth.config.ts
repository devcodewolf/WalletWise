// auth.config.ts
// ⚠️ Este archivo debe ser compatible con Edge Runtime (sin Prisma, sin bcryptjs).
// La lógica de authorize() se define en auth.ts (Node.js runtime).
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default {
	providers: [
		// Solo declaramos el provider; authorize se sobreescribe en auth.ts
		Credentials({}),
	],
} satisfies NextAuthConfig;
