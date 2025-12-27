import { z } from 'zod'

export const recurringSchema = z.object({
	type: z.enum(['Gasto', 'Ingreso'], {
		message: 'El tipo debe ser Gasto o Ingreso',
	}),
	amount: z.coerce.number().positive({
		message: 'El monto debe ser > 0',
	}),
	description: z.string().optional(),
	frequency: z.enum(['MONTHLY', 'YEARLY'], {
		message: 'Selecciona una frecuencia válida',
	}),
	dayOfMonth: z.coerce.number().min(1).max(31, {
		message: 'Día inválido (1-31)',
	}),
	walletId: z.coerce.number().optional(),
	categoryId: z.coerce.number().optional(),
	isActive: z.boolean().default(true),
})

export type RecurringFormSchema = z.infer<typeof recurringSchema>
