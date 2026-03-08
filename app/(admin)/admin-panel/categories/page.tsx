import { Suspense } from 'react'
import { CreateCategoryPanel } from '@/components/categories/create-category-panel'
import { CategoryListPanel } from '@/components/categories/category-list-panel'
import { CategoryListSkeleton } from '@/components/categories/category-list-skeleton'
import HeaderCategory from '@/components/categories/header-category'
import { Separator } from '@/components/ui/separator'

export default function CategoriesPage() {
	return (
		<>
			<div className='pt-4'>
				<HeaderCategory />
			</div>
			<Separator className='mt-4 mb-6' />
			<div className='lg:flex gap-10 items-start'>
				{/* Panel izquierdo — sticky */}
				<aside className='lg:w-96 shrink-0 sticky top-4'>
					<CreateCategoryPanel />
				</aside>

				{/* Panel derecho — lista de categorías */}
				<div className='flex-1 min-w-0'>
					<Suspense fallback={<CategoryListSkeleton />}>
						<CategoryListPanel />
					</Suspense>
				</div>
			</div>
		</>
	)
}
