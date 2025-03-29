'use server';

import { db } from '@/lib/db';
import {
	TransactionsFormSchema,
	transactionsSchema,
} from '@/lib/schemas/transactions';
import { requireAuth } from '@/lib/auth-utils';

// Get all transactions for the current user
export async function getTransactions() {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		const transactions = await db.transaction.findMany({
			where: {
				userId: Number(authResult.user!.id),
			},
			include: {
				wallet: true,
				category: true,
			},
			orderBy: {
				date: 'desc',
			},
		});

		return { success: true, data: transactions };
	} catch (error) {
		console.error('Error fetching transactions:', error);
		return { success: false, error: 'Error al obtener las transacciones' };
	}
}

// Create a new transaction for the current user
export async function createTransaction(values: TransactionsFormSchema) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}
		const validatedFields = transactionsSchema.safeParse(values);
		if (!validatedFields.success) {
			return {
				success: false,
				error: 'Hay campos vacíos o no válidos',
			};
		}
		const transaction = await db.transaction.create({
			data: {
				...validatedFields.data,
				userId: Number(authResult.user!.id),
			},
		});

		return { success: true, data: transaction };
	} catch (error) {
		console.error('Error creating transaction:', error);
		return { success: false, error: 'Error al crear la transacción' };
	}
}

// Update a transaction for the current user
export async function updateTransaction(
	id: number,
	data: TransactionsFormSchema
) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		// First check if the transaction belongs to the current user
		const existingTransaction = await db.transaction.findFirst({
			where: {
				id,
				userId: Number(authResult.user!.id),
			},
		});

		if (!existingTransaction) {
			return {
				success: false,
				error: 'Transacción no encontrada o no autorizada',
			};
		}

		const transaction = await db.transaction.update({
			where: { id },
			data,
		});

		return { success: true, data: transaction };
	} catch (error) {
		console.error('Error updating transaction:', error);
		return { success: false, error: 'Error al actualizar la transacción' };
	}
}

// Delete a transaction for the current user
export async function deleteTransaction(id: number) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		// First check if the transaction belongs to the current user
		const existingTransaction = await db.transaction.findFirst({
			where: {
				id,
				userId: Number(authResult.user!.id),
			},
		});

		if (!existingTransaction) {
			return {
				success: false,
				error: 'Transacción no encontrada o no autorizada',
			};
		}

		await db.transaction.delete({
			where: { id },
		});

		return { success: true };
	} catch (error) {
		console.error('Error deleting transaction:', error);
		return { success: false, error: 'Error al eliminar la transacción' };
	}
}
