import { z } from 'zod';

export const categoryTypes = ['Gasto', 'Ingreso'] as const;

export const categorySchema = z.object({
	name: z.string().min(2, {
		message: 'Nombre de categoría debe tener al menos 2 caracteres.',
	}),
	type: z.enum(categoryTypes),
	iconName: z.string(),
	color: z.string(),
});

export type CategoryType = (typeof categoryTypes)[number];
export type CategoryFormValues = z.infer<typeof categorySchema>;
