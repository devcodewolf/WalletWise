import { object, string, z } from 'zod';

// Tipo exportado para formularios de categorías
export type CategoryFormValues = z.infer<typeof categorySchema>;

export const signInSchema = object({
	email: string({ required_error: 'email es requerido' })
		.min(2, 'Email debe tener al menos 2 caracteres')
		.email('Email inválido'),
	password: string({ required_error: 'Contraseña obligatorio' }).min(
		6,
		'Contraseña debe tener al menos 6 caracteres'
	),
});

export const categorySchema = object({
	name: string().min(2, {
		message: 'Nombre de categoría debe tener al menos 2 caracteres.',
	}),
	type: z.enum(['Gasto', 'Ingreso']),
	iconName: string(),
	color: string(),
});
