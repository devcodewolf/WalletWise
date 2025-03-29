import { z } from 'zod';

export const walletsSchema = z.object({
	name: z.string().min(2, {
		message: 'El nombre debe tener al menos 2 caracteres.',
	}),
	initialBalance: z.coerce.number().min(0, {
		message: 'El saldo inicial debe ser un número positivo.',
	}),
});

export type WalletsFormSchema = z.infer<typeof walletsSchema>;
