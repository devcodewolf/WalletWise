import { Skeleton } from '@/components/ui/skeleton'

export function MonthNavigatorSkeleton() {
	return (
		<div className='flex items-center w-fit gap-4 ml-auto'>
			{/* Botón prev */}
			<Skeleton className='size-8 rounded-[8px]' />
			{/* Mes Año */}
			<Skeleton className='h-5 w-[130px]' />
			{/* Botón next */}
			<Skeleton className='size-8 rounded-[8px]' />
		</div>
	)
}
