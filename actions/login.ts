'use server';

import { signIn, auth } from '@/auth';
import { signInSchema } from '@/lib/zod';

import { AuthError } from 'next-auth';
import { z } from 'zod';

export const login = async (values: z.infer<typeof signInSchema>) => {
	const validateFields = signInSchema.safeParse(values);

	if (!validateFields.success) return { error: 'Invalid fields' };

	const { email, password } = validateFields.data;

	try {
		// console.log('espera');
		await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		// console.log('paso');
		// console.log(data);

		return { success: true };
	} catch (error) {
		if (error instanceof AuthError) {
			if (error.type === 'CredentialsSignin')
				return { error: 'Invalid credentials' };

			return { error: 'Something went wrong' };
		}
		// Handle non-AuthError exceptions
		console.error('Login error:', error);
		return { error: 'An unexpected error occurred' };
	}
};
