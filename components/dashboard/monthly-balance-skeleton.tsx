import { Skeleton } from '@/components/ui/skeleton'

export function MonthlyBalanceSkeleton() {
	return (
		<div className='flex flex-col items-center pt-4 pb-2'>
			{/* Mes */}
			<Skeleton className='h-3 w-20 mb-3' />

			{/* Zona del gráfico */}
			<div className='relative w-[200px] h-[200px]'>
				{/* Etiqueta ingresos arriba izquierda */}
				<div className='absolute top-2 -left-1 flex flex-col gap-1'>
					<Skeleton className='h-3 w-14' />
					<Skeleton className='h-4 w-20 ml-4' />
				</div>

				{/* Donut circular */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<Skeleton className='w-[176px] h-[176px] rounded-full' />
					<div className='absolute flex items-center justify-center'>
						<Skeleton className='w-[124px] h-[124px] rounded-full bg-card' />
					</div>
				</div>

				{/* Centro */}
				<div className='absolute inset-0 flex flex-col items-center justify-center gap-1'>
					<Skeleton className='h-3 w-8' />
					<Skeleton className='h-5 w-20' />
				</div>

				{/* Etiqueta gastos abajo derecha */}
				<div className='absolute bottom-2 -right-1 flex flex-col items-end gap-1'>
					<Skeleton className='h-3 w-14' />
					<Skeleton className='h-4 w-20 mr-4' />
				</div>
			</div>

			{/* Balance */}
			<div className='mt-3 flex items-center gap-2'>
				<Skeleton className='h-3 w-12' />
				<Skeleton className='h-4 w-16' />
			</div>
		</div>
	)
}
