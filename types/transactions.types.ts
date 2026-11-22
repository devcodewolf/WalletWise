import { Prisma } from '@prisma/client'

// Define el tipo extendido con las relaciones
export type TransactionWithRelations = Prisma.TransactionGetPayload<{
	include: {
		wallet: true
		category: true
		recurringTransaction: true
	}
}>

// Ocurrencia pendiente de un recurrente en un mes concreto
export type PendingRecurringOccurrence = Prisma.RecurringTransactionGetPayload<{
	include: {
		wallet: true
		category: true
	}
}> & {
	occurrenceYear: number
	occurrenceMonth: number // 1-12
}

export type RecurringTransactionWithRelations =
	Prisma.RecurringTransactionGetPayload<{
		include: {
			wallet: true
			category: true
			_count: {
				select: { transactions: true }
			}
		}
	}>
