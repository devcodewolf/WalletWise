'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTransaction } from '@/actions/transactions'

import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import type { TransactionWithRelations } from '@/types/transactions.types'

type DeleteTransactionProps = {
	transaction: TransactionWithRelations
}

export function DeleteTransaction({ transaction }: DeleteTransactionProps) {
	const [open, setOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const router = useRouter()

	async function onDelete(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault() // Detener el cierre automático del modal
		setIsDeleting(true)
		try {
			const result = await deleteTransaction(transaction.id)
			if (!result.success) {
				toast.error((result as { error?: string }).error)
				return
			}
			toast.success('Transacción eliminada correctamente')
			setOpen(false) // Cerrar manualmente al terminar
			router.refresh()
		} catch (error) {
			console.error('Error deleting transaction:', error)
			toast.error('Error inesperado al eliminar')
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<Button variant='ghost' size='sm' onClick={() => setOpen(true)}>
				<Trash2 className='h-4 w-4 text-red-500' />
			</Button>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se puede deshacer. Se eliminará permanentemente la
						transacción {transaction.description || `de ${transaction.amount}€`}{' '}
						y todos sus datos asociados.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete} disabled={isDeleting}>
						{isDeleting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Borrando...
							</>
						) : (
							'Eliminar'
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
