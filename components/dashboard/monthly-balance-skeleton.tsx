import { Skeleton } from '@/components/ui/skeleton'

export function MonthlyBalanceSkeleton() {
	return (
		<div className='flex flex-col items-center justify-center flex-1 select-none gap-3'>
			{/* Mes */}
			<Skeleton className='h-3 w-16 mb-1' />

			{/* Donut chart */}
			<div className='relative w-full max-w-[230px] h-[240px]'>
				{/* Etiqueta gastos — arriba izquierda */}
				<div className='absolute top-2 left-0 flex flex-col gap-1'>
					<Skeleton className='h-3 w-12' />
					<Skeleton className='h-4 w-20' />
				</div>

				{/* Donut circular */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<Skeleton className='w-[190px] h-[190px] rounded-full' />
					{/* Agujero interior */}
					<div className='absolute flex items-center justify-center'>
						<Skeleton className='w-[130px] h-[130px] rounded-full bg-card' />
					</div>
				</div>

				{/* Centro: Balance */}
				<div className='absolute inset-0 flex flex-col items-center justify-center gap-1'>
					<Skeleton className='h-3 w-12' />
					<Skeleton className='h-5 w-20' />
				</div>

				{/* Etiqueta ingresos — abajo derecha */}
				<div className='absolute bottom-2 -right-2 flex flex-col items-end gap-1'>
					<Skeleton className='h-3 w-14' />
					<Skeleton className='h-4 w-20' />
				</div>
			</div>
		</div>
	)
}
