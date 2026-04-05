import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { ExpenseTrackerSkeleton } from '@/components/dashboard/expense-tracker-skeleton'

// Skeleton del panel derecho: CurrentDay + RecentTransactions
function RightColumnSkeleton() {
	return (
		<div className='flex flex-col md:col-span-1 lg:col-span-1 row-span-2 gap-4'>
			{/* CurrentDay skeleton */}
			<Card className='p-6 space-y-2'>
				<Skeleton className='h-3 w-8' />
				<Skeleton className='h-8 w-40' />
				<Skeleton className='h-4 w-16' />
			</Card>

			{/* RecentTransactions skeleton */}
			<Card className='px-5 py-5 flex-1 space-y-3 overflow-hidden max-h-96 md:max-h-none'>
				<Skeleton className='h-5 w-36 mb-1' />
				{Array.from({ length: 8 }).map((_, i) => (
					<div
						key={i}
						className='flex items-center gap-3 py-1 border-b border-border/50 last:border-0'>
						<Skeleton className='size-6 rounded-full shrink-0' />
						<div className='flex-1 space-y-1'>
							<Skeleton className='h-3 w-16' />
							<Skeleton className='h-4 w-28' />
						</div>
						<Skeleton className='h-4 w-20 shrink-0' />
					</div>
				))}
			</Card>
		</div>
	)
}

// Skeleton del gráfico anual: título + tabs + barras + resumen
function YearlyChartSkeleton() {
	return (
		<Card className='p-7 gap-4 justify-between row-span-2 col-span-1 lg:col-span-3 min-h-0 overflow-hidden'>
			{/* Cabecera: título + selector tabs */}
			<div className='flex items-center justify-between mb-2'>
				<Skeleton className='h-6 w-48' />
				<Skeleton className='h-8 w-28 rounded-lg' />
			</div>

			{/* Área del gráfico */}
			<div className='flex-1 min-h-0 flex flex-col gap-4'>
				{/* Eje Y simulado */}
				<div className='flex gap-3 flex-1 min-h-0 items-end pb-6'>
					<div className='flex flex-col justify-between h-full py-2 gap-1 shrink-0'>
						{Array.from({ length: 5 }).map((_, i) => (
							<Skeleton key={i} className='h-3 w-8' />
						))}
					</div>
					{/* Barras del gráfico */}
					<div className='flex-1 flex items-end justify-around gap-2 h-48'>
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i} className='flex gap-0.5 items-end flex-1'>
								<Skeleton
									className='flex-1 rounded-t-sm'
									style={{ height: `${40 + Math.sin(i * 0.8) * 30 + 20}%` }}
								/>
								<Skeleton
									className='flex-1 rounded-t-sm opacity-60'
									style={{ height: `${20 + Math.cos(i * 0.6) * 15 + 10}%` }}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Eje X: meses */}
				<div className='flex justify-around'>
					{['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map(
						(_, i) => (
							<Skeleton key={i} className='h-3 w-4' />
						),
					)}
				</div>

				{/* Resumen anual */}
				<div className='grid grid-cols-3 gap-2 rounded-xl border border-border px-4 py-3 mt-2'>
					{['Total Ingresos', 'Total Gastos', 'Balance Neto'].map((label) => (
						<div key={label} className='flex flex-col items-center gap-1'>
							<Skeleton className='h-2.5 w-20' />
							<Skeleton className='h-5 w-24' />
						</div>
					))}
				</div>
			</div>
		</Card>
	)
}

export default function DashboardPageSkeleton() {
	return (
		<>
			{/* Texto (*) datos comparativos */}
			<Skeleton className='h-4 w-52 ml-auto mb-2 mt-3' />
			{/* Métricas: 4 cards */}
			<ExpenseTrackerSkeleton />

			{/* Sección principal: gráfico + columna derecha */}
			<section className='grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:h-[calc(100vh-18rem)] 2xl:h-[calc(100vh-26rem)] mt-4'>
				<YearlyChartSkeleton />
				<RightColumnSkeleton />
			</section>
		</>
	)
}
