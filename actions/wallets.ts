'use server';

import { db } from '@/lib/db';
import { WalletsFormSchema, walletsSchema } from '@/lib/schemas/wallets';
import { requireAuth } from '@/lib/auth-utils';

// Get all wallets for the current user
export async function getWallets() {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		const wallets = await db.wallet.findMany({
			where: {
				userId: Number(authResult.user!.id),
			},
			orderBy: {
				name: 'desc',
			},
		});

		return { success: true, data: wallets };
	} catch (error) {
		console.error('Error fetching wallets:', error);
		return { success: false, error: 'Error al obtener las carteras' };
	}
}

// Create a new wallet for the current user
export async function createWallet(values: WalletsFormSchema) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}
		const validatedFields = walletsSchema.safeParse(values);
		if (!validatedFields.success) {
			return {
				success: false,
				error: 'Hay campos vacíos o no válidos',
			};
		}
		const wallet = await db.wallet.create({
			data: {
				...validatedFields.data,
				currentBalance: validatedFields.data.initialBalance, // Asignar el mismo valor que initialBalance
				userId: Number(authResult.user!.id),
			},
		});

		return { success: true, data: wallet };
	} catch (error) {
		console.error('Error creating wallet:', error);
		return { success: false, error: 'Error al crear la cartera' };
	}
}

// Update a wallet for the current user
export async function updateWallet(
	id: number,
	data: { name?: string; initialBalance?: number }
) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		// First check if the wallet belongs to the current user
		const existingWallet = await db.wallet.findFirst({
			where: {
				id,
				userId: Number(authResult.user!.id),
			},
		});

		if (!existingWallet) {
			return { success: false, error: 'Cartera no encontrada o no autorizada' };
		}

		const wallet = await db.wallet.update({
			where: { id },
			data,
		});

		return { success: true, data: wallet };
	} catch (error) {
		console.error('Error updating wallet:', error);
		return { success: false, error: 'Error al actualizar la cartera' };
	}
}

// Delete a wallet for the current user
export async function deleteWallet(id: number) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		// First check if the wallet belongs to the current user
		const existingWallet = await db.wallet.findFirst({
			where: {
				id,
				userId: Number(authResult.user!.id),
			},
		});

		if (!existingWallet) {
			return { success: false, error: 'Cartera no encontrada o no autorizada' };
		}

		await db.wallet.delete({
			where: { id },
		});

		return { success: true };
	} catch (error) {
		console.error('Error al eliminar la cartera:', error);
		if (error instanceof Error && error.message.includes('foreign key')) {
			return {
				success: false,
				error:
					'No se puede eliminar esta cartera porque tiene transacciones asociadas.',
			};
		}
		return { success: false, error: 'Ha habido un fallo al borrar la cartera' };
	}
}
