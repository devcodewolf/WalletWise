'use client'

import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createCategory } from '@/actions/categories'
import { CategoryForm } from './category-form'
import { CategoryFormValues } from '@/lib/schemas/category'
import { Category } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface AddCategoryProps {
	onSuccess?: (newCategory: Category) => void
}

export function AddCategory({ onSuccess }: AddCategoryProps) {
	const router = useRouter()

	const handleSubmit = async (values: CategoryFormValues) => {
		const result = await createCategory(values)
		const success = !!result.success

		if (success && 'data' in result) {
			// Propagar al padre si lo necesita
			onSuccess?.(result.data)
			// Pequeño delay para que la animación de cierre termine antes del refresh
			setTimeout(() => {
				router.refresh()
			}, 150)
		}

		return { success }
	}

	return (
		<CategoryForm
			mode='create'
			onSubmit={handleSubmit}
			triggerButton={
				<Button className='ml-auto flex'>
					<PlusCircle className='size-4' />
					<p className='leading-0'>Nueva categoría</p>
				</Button>
			}
			dialogTitle='Añadir nueva categoría'
			dialogDescription='Crear una nueva categoría para rastrear sus gastos o ingresos.'
			submitButtonText='Crear categoría'
		/>
	)
}
