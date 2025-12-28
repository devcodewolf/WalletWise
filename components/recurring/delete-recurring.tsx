'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteRecurringTransaction } from '@/actions/recurring'
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog'
import { RecurringTransactionWithRelations } from '@/types/transactions.types'

interface DeleteRecurringProps {
	recurring: RecurringTransactionWithRelations
}

export function DeleteRecurring({ recurring }: DeleteRecurringProps) {
	const handleDelete = async () => {
		const result = await deleteRecurringTransaction(recurring.id)
		return {
			success: result.success,
			error: result.success
				? undefined
				: (result as { error?: string }).error || 'Error al eliminar',
		}
	}

	return (
		<DeleteConfirmDialog
			trigger={
				<Button variant='ghost' size='sm'>
					<Trash2 className='h-4 w-4 text-red-500' />
				</Button>
			}
			title='¿Estás seguro?'
			description={
				<>
					Esta acción no se puede deshacer. Se eliminará permanentemente la
					regla recurrente{' '}
					<strong>
						&quot;{recurring.description || 'Sin descripción'}&quot;
					</strong>{' '}
					y no se generarán más alertas para este movimiento.
				</>
			}
			onDelete={handleDelete}
			successMessage='Regla eliminada correctamente'
		/>
	)
}
