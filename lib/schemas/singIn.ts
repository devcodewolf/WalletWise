import { object, string } from 'zod';

export const signInSchema = object({
	email: string({ required_error: 'email es requerido' })
		.min(2, 'Email debe tener al menos 2 caracteres')
		.email('Email inválido'),
	password: string({ required_error: 'Contraseña obligatorio' }).min(
		6,
		'Contraseña debe tener al menos 6 caracteres'
	),
});
