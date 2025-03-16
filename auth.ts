import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

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
	session: { strategy: 'jwt' },
	...authConfig,
});
