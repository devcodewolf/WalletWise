'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteTransaction } from '@/actions/transactions'
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog'
import type { TransactionWithRelations } from '@/types/transactions.types'

type DeleteTransactionProps = {
	transaction: TransactionWithRelations
}

export function DeleteTransaction({ transaction }: DeleteTransactionProps) {
	const handleDelete = async () => {
		const result = await deleteTransaction(transaction.id)
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
					transacción{' '}
					<strong>
						{transaction.description || `de ${transaction.amount}€`}
					</strong>{' '}
					y todos sus datos asociados.
				</>
			}
			onDelete={handleDelete}
			successMessage='Transacción eliminada correctamente'
		/>
	)
}
