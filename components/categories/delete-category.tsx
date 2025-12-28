'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteCategory } from '@/actions/categories'
import { Category } from '@prisma/client'
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog'

interface DeleteCategoryProps {
	category: Category
}

export function DeleteCategory({ category }: DeleteCategoryProps) {
	const handleDelete = async () => {
		const response = await deleteCategory(category.id)
		return {
			success: response.success,
			error: response.success ? undefined : 'Error al eliminar la categoría',
		}
	}

	return (
		<DeleteConfirmDialog
			trigger={
				<Button variant='ghost' size='sm'>
					<Trash2 className='h-4 w-4 text-red-500' />
				</Button>
			}
			title='Borrar categoría'
			description={
				<>
					¿Estás seguro de que quieres eliminar la categoría{' '}
					<strong>{category.name}</strong>? Esta acción no se puede deshacer.
				</>
			}
			onDelete={handleDelete}
			successMessage={`Categoría "${category.name}" eliminada`}
		/>
	)
}
