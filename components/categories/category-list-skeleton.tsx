import { Skeleton } from '@/components/ui/skeleton'

function CategoryItemSkeleton() {
	return (
		<li className='flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3'>
			{/* Icono circular */}
			<Skeleton className='size-9 rounded-full shrink-0' />

			{/* Nombre + badge */}
			<div className='flex items-center gap-2 flex-1 min-w-0'>
				<Skeleton className='h-4 w-24' />
				<Skeleton className='h-4 w-12 rounded-full' />
			</div>

			{/* Acciones */}
			<div className='flex items-center gap-1'>
				<Skeleton className='size-8 rounded-md' />
				<Skeleton className='size-8 rounded-md' />
			</div>
		</li>
	)
}

export function CategoryListSkeleton({ count = 8 }: { count?: number }) {
	return (
		<div>
			{/* Cabecera: título + contador */}
			<div className='mb-4 space-y-1'>
				<Skeleton className='h-6 w-36' />
				<Skeleton className='h-4 w-24' />
			</div>

			{/* Grid de 2 columnas igual que el real */}
			<ul className='grid grid-cols-2 gap-x-5 gap-y-3'>
				{Array.from({ length: count }).map((_, i) => (
					<CategoryItemSkeleton key={i} />
				))}
			</ul>
		</div>
	)
}
