'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteRecurringTransaction } from '@/actions/recurring'
import { useState } from 'react'
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
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { RecurringTransactionWithRelations } from '@/types/transactions.types'

interface DeleteRecurringProps {
	recurring: RecurringTransactionWithRelations
}

export function DeleteRecurring({ recurring }: DeleteRecurringProps) {
	const [open, setOpen] = useState(false)
	const router = useRouter()

	async function onDelete() {
		const result = await deleteRecurringTransaction(recurring.id)
		if (!result.success) {
			return toast.error((result as { error?: string }).error)
		}
		toast.success('Regla eliminada correctamente')
		setOpen(false)
		setTimeout(() => {
			router.refresh()
		}, 300)
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
						regla recurrente &quot;{recurring.description || 'Sin descripción'}
						&quot; y no se generarán más alertas para este movimiento.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>Eliminar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
