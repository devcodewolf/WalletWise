import { z } from 'zod';

export const transactionsSchema = z.object({
	type: z.enum(['Gasto', 'Ingreso'], {
		message: 'El tipo debe ser Gasto o Ingreso',
	}),
	date: z.coerce.date({
		message: 'La fecha es requerida',
	}),
	amount: z.coerce.number().positive({
		message: 'El monto debe ser > 0',
	}),
	description: z.string().optional(),
	walletId: z.coerce.number().optional(),
	categoryId: z.coerce.number().optional(),
});

export type TransactionsFormSchema = z.infer<typeof transactionsSchema>;
