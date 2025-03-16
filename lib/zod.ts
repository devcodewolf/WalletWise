import { object, string } from 'zod';

export const signInSchema = object({
	email: string({ required_error: 'email is required' })
		.min(2, 'Email almost be 2 characters long')
		.email('Invalid email'),
	password: string({ required_error: 'Password is required' }).min(
		6,
		'Password almost be 6 characters long'
	),
});
