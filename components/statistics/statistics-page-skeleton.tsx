import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { StatisticsYearSkeleton } from './statistics-year-skeleton';
import { StatisticsMonthSkeleton } from './statistics-month-skeleton';
import { StatisticsCategoriesSkeleton } from './statistics-categories-skeleton';

export function StatisticsPageSkeleton() {
	return (
		<>
			{/* Gráficos en columnas */}
			<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-6">
				{/* Skeleton para grafico anual */}
				<Card className="p-5 gap-4 2xl:col-span-2 max-h-[500px]">
					<StatisticsYearSkeleton />
				</Card>
				{/* Skeleton para Gráfico mensual */}
				<Card className="p-5 gap-4">
					<StatisticsMonthSkeleton />
				</Card>
			</div>
			{/* Skeleton para StatisticsCategories */}
			<Card className="p-5 gap-4">
				<StatisticsCategoriesSkeleton />
			</Card>

			<div className="grid grid-cols-1 2xl:grid-cols-3 gap-4 mt-6">
				{/* Skeleton para Resúmenes mensuales y trimestrales */}
				<Card className="p-5 px-6 gap-4 2xl:col-span-2">
					<div className="flex items-center justify-end mb-4">
						<Skeleton className="h-10 w-24" />
					</div>
					<div className="grid grid-cols-1 xl:grid-cols-2">
						<div className="border-b pb-6 xl:border-b-0 xl:border-r pr-4 xl:pr-8 border-border">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5" />
									<Skeleton className="h-6 w-px" />
									<Skeleton className="h-6 w-48" />
								</div>
							</div>
							<div className="space-y-4 pt-2">
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
							</div>
						</div>
						<div className="mt-6 xl:mt-0 xl:pl-8">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5" />
									<Skeleton className="h-6 w-px" />
									<Skeleton className="h-6 w-48" />
								</div>
							</div>
							<div className="space-y-4 pt-2">
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
							</div>
						</div>
					</div>
				</Card>
				{/* Skeleton para Balance anual */}
				<Card className="p-5 gap-2">
					<div className="mb-4">
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-5 rounded-full" />
							<Skeleton className="h-6 w-32" />
						</div>
						<Skeleton className="h-4 w-48 mt-2" />
					</div>
					<Skeleton className="h-64 w-full" />
				</Card>
			</div>
		</>
	);
}
