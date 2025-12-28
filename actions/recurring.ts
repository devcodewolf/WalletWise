'use server'

import { db } from '@/lib/db'
import { recurringSchema, RecurringFormSchema } from '@/lib/schemas/recurring'
import { requireAuth } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

// Obtener todas las transacciones recurrentes del usuario
export async function getRecurringTransactions() {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}

		const rules = await db.recurringTransaction.findMany({
			where: {
				userId: Number(authResult.user!.id),
			},
			include: {
				wallet: true,
				category: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return { success: true, data: rules }
	} catch (error) {
		console.error('Error fetching recurring transactions:', error)
		return { success: false, error: 'Error al obtener las recurrencias' }
	}
}

// Crear una nueva regla recurrente (sin transacción inmediata, solo la regla)
export async function createRecurringTransaction(values: RecurringFormSchema) {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}

		const validatedFields = recurringSchema.safeParse(values)
		if (!validatedFields.success) {
			return {
				success: false,
				error: 'Datos inválidos',
			}
		}

		const rule = await db.recurringTransaction.create({
			data: {
				...validatedFields.data,
				userId: Number(authResult.user!.id),
			},
		})

		revalidatePath('/admin-panel/recurring')
		return { success: true, data: rule }
	} catch (error) {
		console.error('Error creating recurring transaction:', error)
		return { success: false, error: 'Error al crear la regla recurrente' }
	}
}

// Actualizar una regla recurrente
export async function updateRecurringTransaction(
	id: number,
	values: RecurringFormSchema
) {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}

		const validatedFields = recurringSchema.safeParse(values)
		if (!validatedFields.success) {
			return {
				success: false,
				error: 'Datos inválidos',
			}
		}

		// Verificar propiedad
		const existing = await db.recurringTransaction.findUnique({
			where: { id },
		})

		if (!existing || existing.userId !== Number(authResult.user!.id)) {
			return { success: false, error: 'No autorizado' }
		}

		const updated = await db.recurringTransaction.update({
			where: { id },
			data: validatedFields.data,
		})

		revalidatePath('/admin-panel/recurring')
		return { success: true, data: updated }
	} catch (error) {
		console.error('Error updating recurring transaction:', error)
		return { success: false, error: 'Error al actualizar la regla' }
	}
}

// Eliminar una regla recurrente
export async function deleteRecurringTransaction(id: number) {
	try {
		const authResult = await requireAuth()
		if (!authResult.success) {
			return authResult
		}

		const existing = await db.recurringTransaction.findUnique({
			where: { id },
		})

		if (!existing || existing.userId !== Number(authResult.user!.id)) {
			return { success: false, error: 'No autorizado' }
		}

		await db.recurringTransaction.delete({
			where: { id },
		})

		revalidatePath('/admin-panel/recurring')
		return { success: true }
	} catch (error) {
		console.error('Error deleting recurring transaction:', error)
		return { success: false, error: 'Error al eliminar la regla' }
	}
}
