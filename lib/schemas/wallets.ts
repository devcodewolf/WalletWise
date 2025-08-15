import { z } from 'zod';

export const walletsSchema = z.object({
    name: z.string().min(2, {
        message: 'El nombre debe tener al menos 2 caracteres.',
    }),
    initialBalance: z.coerce.number().positive({
        message: 'El saldo inicial debe ser mayor que 0.',
    }),
    currentBalance: z.coerce.number().optional(), // Hacerlo opcional ya que se establecerá en el servidor
});

export type WalletsFormSchema = z.infer<typeof walletsSchema>;
