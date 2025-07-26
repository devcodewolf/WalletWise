import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from './data/user';
import bcryptjs from 'bcryptjs';
import { signInSchema } from './lib/schemas/singIn';

export default {
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
						// Mapear el usuario de Prisma al formato que espera NextAuth
						return {
							id: String(user.id), // Asegurar que el ID sea un string
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
} satisfies NextAuthConfig;
