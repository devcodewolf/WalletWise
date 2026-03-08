import { getCategories } from '@/actions/categories'
import { Category } from '@prisma/client'
import { CategoryListItem } from './category-list-item'

export async function CategoryListPanel() {
	const resp = await getCategories()
	const categories: Category[] = resp.success && 'data' in resp ? resp.data : []

	return (
		<div>
			{/* Cabecera */}
			<div className='mb-4'>
				<h2 className='text-xl font-bold'>Tus categorías</h2>
				<p className='text-sm text-muted-foreground mt-0.5'>
					{categories.length}{' '}
					{categories.length === 1 ? 'categoría' : 'categorías'}
				</p>
			</div>

			{categories.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-16 text-muted-foreground gap-2'>
					<p className='text-sm'>Aún no tienes categorías</p>
					<p className='text-xs'>Crea tu primera categoría con el formulario</p>
				</div>
			) : (
				<ul className='grid grid-cols-2 gap-x-5 gap-y-3'>
					{categories.map((cat) => (
						<CategoryListItem key={cat.id} category={cat} />
					))}
				</ul>
			)}
		</div>
	)
}
