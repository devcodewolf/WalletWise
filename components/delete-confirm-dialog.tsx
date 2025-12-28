'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
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

interface DeleteConfirmDialogProps {
	/** El botón que abre el diálogo (trigger) */
	trigger: React.ReactNode
	/** Título del diálogo */
	title: string
	/** Descripción/mensaje del diálogo */
	description: React.ReactNode
	/** Función que ejecuta la eliminación - debe retornar {success: boolean, error?: string} */
	onDelete: () => Promise<{ success: boolean; error?: string }>
	/** Mensaje de éxito (opcional) */
	successMessage?: string
}

export function DeleteConfirmDialog({
	trigger,
	title,
	description,
	onDelete,
	successMessage = 'Eliminado correctamente',
}: DeleteConfirmDialogProps) {
	const [open, setOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const router = useRouter()

	async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault() // Evitar cierre automático del modal
		setIsDeleting(true)
		try {
			const result = await onDelete()
			if (!result.success) {
				toast.error(result.error || 'Error al eliminar')
				setIsDeleting(false)
				return
			}
			toast.success(successMessage)
			setOpen(false)
			setIsDeleting(false) // Resetear antes del refresh
			// Pequeño delay para que la animación de cierre termine antes del refresh
			setTimeout(() => {
				router.refresh()
			}, 150)
		} catch (error) {
			console.error('Error deleting:', error)
			toast.error('Error inesperado al eliminar')
			setIsDeleting(false)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<div onClick={() => setOpen(true)}>{trigger}</div>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
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
