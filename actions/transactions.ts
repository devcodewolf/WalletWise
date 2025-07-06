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

		const { walletId, amount, type } = validatedFields.data;

		// Iniciar una transacción para asegurar la consistencia de los datos
		const result = await db.$transaction(async (prisma) => {
			// 1. Crear la transacción
			const transaction = await prisma.transaction.create({
				data: {
					...validatedFields.data,
					userId: Number(authResult.user!.id),
				},
			});

			// 2. Actualizar el saldo de la billetera si se especificó una billetera
			if (walletId) {
				const incrementValue = type === 'Ingreso' ? amount : -amount;

				await prisma.wallet.update({
					where: { id: walletId },
					data: {
						initialBalance: {
							increment: incrementValue,
						},
					},
				});
			}

			return transaction;
		});

		return { success: true, data: result };
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
			include: {
				wallet: true,
			},
		});

		if (!existingTransaction) {
			return {
				success: false,
				error: 'Transacción no encontrada o no autorizada',
			};
		}

		const { walletId: newWalletId, amount: newAmount, type: newType } = data;
		const {
			walletId: oldWalletId,
			amount: oldAmount,
			type: oldType,
		} = existingTransaction;

		// Iniciar una transacción para asegurar la consistencia de los datos
		const result = await db.$transaction(async (prisma) => {
			// 1. Revertir el saldo de la billetera anterior si existía
			if (oldWalletId) {
				const oldIncrementValue =
					oldType === 'Ingreso' ? -oldAmount : oldAmount;
				// console.log(
				// 	'Revertir saldo anterior - Wallet ID:',
				// 	oldWalletId,
				// 	'Monto:',
				// 	oldIncrementValue
				// );
				await prisma.wallet.update({
					where: { id: oldWalletId },
					data: {
						initialBalance: {
							increment: oldIncrementValue,
						},
					},
				});
			}

			// 2. Actualizar la transacción
			const updatedTransaction = await prisma.transaction.update({
				where: { id },
				data: {
					...data,
					amount: newAmount, // Asegurarse de que el monto sea un número
				},
			});

			// 3. Aplicar el nuevo saldo a la nueva billetera si se especificó
			if (newWalletId && newWalletId !== oldWalletId) {
				const newIncrementValue =
					newType === 'Ingreso' ? newAmount : -newAmount;
				// console.log(
				// 	'Aplicar nuevo saldo - Wallet ID:',
				// 	newWalletId,
				// 	'Monto:',
				// 	newIncrementValue
				// );
				await prisma.wallet.update({
					where: { id: newWalletId },
					data: {
						initialBalance: {
							increment: newIncrementValue,
						},
					},
				});
			}

			return updatedTransaction;
		});

		return { success: true, data: result };
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
			include: {
				wallet: true,
			},
		});

		if (!existingTransaction) {
			return {
				success: false,
				error: 'Transacción no encontrada o no autorizada',
			};
		}

		const { walletId, amount, type } = existingTransaction;

		// Iniciar una transacción para asegurar la consistencia de los datos
		await db.$transaction(async (prisma) => {
			// 1. Revertir el saldo de la billetera si existe
			if (walletId) {
				const incrementValue = type === 'Ingreso' ? -amount : amount;
				await prisma.wallet.update({
					where: { id: walletId },
					data: {
						initialBalance: {
							increment: incrementValue,
						},
					},
				});
			}

			// 2. Eliminar la transacción
			await prisma.transaction.delete({
				where: { id },
			});
		});

		return { success: true };
	} catch (error) {
		console.error('Error deleting transaction:', error);
		return { success: false, error: 'Error al eliminar la transacción' };
	}
}
