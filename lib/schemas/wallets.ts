import { z } from 'zod'

export const walletsSchema = z.object({
	name: z.string().min(2, {
		message: 'El nombre debe tener al menos 2 caracteres.',
	}),
	initialBalance: z.coerce.number({
		invalid_type_error: 'El saldo inicial debe ser un número válido.',
	}),
	currentBalance: z.coerce.number({
		invalid_type_error: 'El saldo actual debe ser un número válido.',
	}).optional(),
	color: z.string().optional().default('#3b82f6'),
	image: z.string().nullable().optional(),
})

export type WalletsFormSchema = z.infer<typeof walletsSchema>

