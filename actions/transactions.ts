'use server'

import { db } from '@/lib/db'
import {
	TransactionsFormSchema,
	transactionsSchema,
} from '@/lib/schemas/transactions'
import { requireAuth } from '@/lib/auth-utils'

// Get all transactions for the current user
export async function getTransactions() {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}
		// Simulate a 5-second delay
		// await new Promise((resolve) => setTimeout(resolve, 5000));
		const transactions = await db.transaction.findMany({
			where: {
				userId: Number(authResult.user!.id),
			},
			include: {
				wallet: true,
				category: true,
				recurringTransaction: true,
			},
			orderBy: {
				date: 'desc',
			},
		})

		return { success: true, data: transactions }
	} catch (error) {
		console.error('Error fetching transactions:', error)
		return { success: false, error: 'Error al obtener las transacciones' }
	}
}

// Create a new transaction for the current user
export async function createTransaction(values: TransactionsFormSchema) {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}

		const validatedFields = transactionsSchema.safeParse(values)
		if (!validatedFields.success) {
			return {
				success: false,
				error: 'Hay campos vacíos o no válidos',
			}
		}

		const {
			walletId,
			amount,
			type,
			isRecurring,
			frequency,
			dayOfMonth,
			...rest
		} = validatedFields.data
		const userId = Number(authResult.user!.id)

		// Iniciar una transacción para asegurar la consistencia de los datos
		const result = await db.$transaction(async (prisma) => {
			let recurringTransactionId: number | undefined = undefined

			// 1. Si es recurrente, crear primero el registro de recurrencia
			if (isRecurring && frequency) {
				const recurringRule = await prisma.recurringTransaction.create({
					data: {
						type,
						amount,
						description: rest.description,
						walletId,
						categoryId: rest.categoryId,
						userId,
						frequency,
						dayOfMonth: dayOfMonth || new Date(rest.date).getDate(),
					},
				})
				recurringTransactionId = recurringRule.id
			}

			// 2. Crear la transacción vinculada a la regla recurrente si existe
			const transaction = await prisma.transaction.create({
				data: {
					type,
					amount,
					walletId,
					userId,
					recurringTransactionId, // Vincular con la regla si existe
					...rest,
				},
			})

			// 3. Actualizar el saldo de la billetera si se especificó una billetera
			if (walletId) {
				const incrementValue = type === 'Ingreso' ? amount : -amount

				await prisma.wallet.update({
					where: { id: walletId },
					data: {
						currentBalance: {
							increment: incrementValue,
						},
					},
				})
			}

			return transaction
		})

		return { success: true, data: result }
	} catch (error) {
		console.error('Error creating transaction:', error)
		return { success: false, error: 'Error al crear la transacción' }
	}
}

// Update a transaction for the current user
export async function updateTransaction(
	id: number,
	data: TransactionsFormSchema
) {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}

		// First check if the transaction belongs to the current user
		const existingTransaction = await db.transaction.findFirst({
			where: {
				id,
				userId: Number(authResult.user!.id),
			},
			include: {
				wallet: true,
				recurringTransaction: true,
			},
		})

		if (!existingTransaction) {
			return {
				success: false,
				error: 'Transacción no encontrada o no autorizada',
			}
		}

		// Extraer campos que NO pertenecen al modelo Transaction
		const {
			isRecurring,
			frequency,
			dayOfMonth,
			walletId: newWalletId,
			amount: newAmount,
			type: newType,
			...transactionData
		} = data

		const {
			walletId: oldWalletId,
			amount: oldAmount,
			type: oldType,
		} = existingTransaction

		const userId = Number(authResult.user!.id)

		// Iniciar una transacción para asegurar la consistencia de los datos
		const result = await db.$transaction(async (prisma) => {
			let recurringTransactionId: number | null | undefined =
				existingTransaction.recurringTransactionId || undefined

			// 1. Manejar la regla recurrente
			if (isRecurring && frequency) {
				// Si ya existe una regla vinculada, actualizarla
				if (existingTransaction.recurringTransactionId) {
					await prisma.recurringTransaction.update({
						where: { id: existingTransaction.recurringTransactionId },
						data: {
							type: newType,
							amount: newAmount,
							description: transactionData.description,
							walletId: newWalletId,
							categoryId: transactionData.categoryId,
							frequency,
							dayOfMonth:
								dayOfMonth || new Date(transactionData.date).getDate(),
						},
					})
				} else {
					// Si no existe, crear una nueva regla
					const newRule = await prisma.recurringTransaction.create({
						data: {
							type: newType,
							amount: newAmount,
							description: transactionData.description,
							walletId: newWalletId,
							categoryId: transactionData.categoryId,
							userId,
							frequency,
							dayOfMonth:
								dayOfMonth || new Date(transactionData.date).getDate(),
						},
					})
					recurringTransactionId = newRule.id
				}
			} else if (!isRecurring && existingTransaction.recurringTransactionId) {
				// Si había una regla pero ahora no es recurrente, desvincular
				recurringTransactionId = null
			}

			// 2. Revertir el saldo de la billetera anterior si existía
			if (oldWalletId) {
				const oldIncrementValue = oldType === 'Ingreso' ? -oldAmount : oldAmount
				await prisma.wallet.update({
					where: { id: oldWalletId },
					data: {
						currentBalance: {
							increment: oldIncrementValue,
						},
					},
				})
			}

			// 3. Actualizar la transacción (solo campos que existen en el modelo)
			const updatedTransaction = await prisma.transaction.update({
				where: { id },
				data: {
					type: newType,
					amount: newAmount,
					walletId: newWalletId,
					recurringTransactionId,
					...transactionData,
				},
			})

			// 4. Aplicar el nuevo saldo a la billetera destino (sea la misma u otra)
			if (newWalletId) {
				const newIncrementValue = newType === 'Ingreso' ? newAmount : -newAmount
				await prisma.wallet.update({
					where: { id: newWalletId },
					data: {
						currentBalance: {
							increment: newIncrementValue,
						},
					},
				})
			}

			return updatedTransaction
		})

		return { success: true, data: result }
	} catch (error) {
		console.error('Error updating transaction:', error)
		return { success: false, error: 'Error al actualizar la transacción' }
	}
}

// Delete a transaction for the current user
export async function deleteTransaction(id: number) {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
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
		})

		if (!existingTransaction) {
			return {
				success: false,
				error: 'Transacción no encontrada o no autorizada',
			}
		}

		const { walletId, amount, type } = existingTransaction

		// Iniciar una transacción para asegurar la consistencia de los datos
		await db.$transaction(async (prisma) => {
			// 1. Revertir el saldo de la billetera si existe
			if (walletId) {
				const incrementValue = type === 'Ingreso' ? -amount : amount
				await prisma.wallet.update({
					where: { id: walletId },
					data: {
						currentBalance: {
							increment: incrementValue,
						},
					},
				})
			}

			// 2. Eliminar la transacción
			await prisma.transaction.delete({
				where: { id },
			})
		})

		return { success: true }
	} catch (error) {
		console.error('Error deleting transaction:', error)
		return { success: false, error: 'Error al eliminar la transacción' }
	}
}

// Get pending recurring transactions for the current month
export async function getPendingRecurringTransactions() {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}

		const userId = Number(authResult.user!.id)
		const now = new Date()
		const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
		const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

		// 1. Obtener todas las reglas recurrentes activas
		const recurringRules = await db.recurringTransaction.findMany({
			where: {
				userId,
				isActive: true,
			},
			include: {
				wallet: true,
				category: true,
			},
		})

		// 2. Obtener IDs de reglas que ya tienen una transacción este mes
		const fulfilledRules = await db.transaction.findMany({
			where: {
				userId,
				recurringTransactionId: { not: null },
				date: {
					gte: startOfMonth,
					lte: endOfMonth,
				},
			},
			select: {
				recurringTransactionId: true,
			},
		})

		const fulfilledIds = new Set(
			fulfilledRules.map((r) => r.recurringTransactionId)
		)

		// 3. Filtrar las que faltan
		const pending = recurringRules.filter((rule) => !fulfilledIds.has(rule.id))

		return { success: true, data: pending }
	} catch (error) {
		console.error('Error fetching pending transactions:', error)
		return {
			success: false,
			error: 'Error al obtener transacciones pendientes',
		}
	}
}

// Confirm and insert multiple recurring transactions
export async function confirmRecurringTransactions(
	items: { recurringTransactionId: number; amount: number; date: Date }[]
) {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}

		const userId = Number(authResult.user!.id)

		const result = await db.$transaction(async (prisma) => {
			const createdTransactions = []

			for (const item of items) {
				const rule = await prisma.recurringTransaction.findUnique({
					where: { id: item.recurringTransactionId, userId },
				})

				if (!rule) continue

				// Crear la transacción real
				const transaction = await prisma.transaction.create({
					data: {
						type: rule.type,
						amount: item.amount,
						description: rule.description,
						date: item.date,
						walletId: rule.walletId,
						categoryId: rule.categoryId,
						userId: userId,
						recurringTransactionId: rule.id,
					},
				})

				// Actualizar saldo de billetera
				if (rule.walletId) {
					const incrementValue =
						rule.type === 'Ingreso' ? item.amount : -item.amount
					await prisma.wallet.update({
						where: { id: rule.walletId },
						data: {
							currentBalance: {
								increment: incrementValue,
							},
						},
					})
				}

				createdTransactions.push(transaction)
			}

			return createdTransactions
		})

		return { success: true, data: result }
	} catch (error) {
		console.error('Error confirming recurring transactions:', error)
		return { success: false, error: 'Error al confirmar las transacciones' }
	}
}
