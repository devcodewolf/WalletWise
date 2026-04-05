import { z } from 'zod'

export const walletsSchema = z.object({
	name: z.string().min(2, {
		message: 'El nombre debe tener al menos 2 caracteres.',
	}),
	initialBalance: z.coerce.number().positive({
		message: 'El saldo inicial debe ser mayor que 0.',
	}),
	currentBalance: z.coerce.number().optional(),
	color: z.string().optional().default('#3b82f6'),
	image: z.string().nullable().optional(),
})

export type WalletsFormSchema = z.infer<typeof walletsSchema>

