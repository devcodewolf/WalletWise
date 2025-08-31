import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { StatisticsYearSkeleton } from './statistics-year-skeleton';
import { StatisticsMonthSkeleton } from './statistics-month-skeleton';
import { StatisticsCategoriesSkeleton } from './statistics-categories-skeleton';

export function StatisticsPageSkeleton() {
	return (
		<>
			{/* Gráficos en 3 columnas */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
				{/* Skeleton para grafico anual */}
				<Card className="p-5 gap-4">
					<StatisticsYearSkeleton />
				</Card>
				{/* Skeleton para Gráfico mensual */}
				<Card className="p-5 gap-4">
					<StatisticsMonthSkeleton />
				</Card>
				{/* Skeleton para StatisticsCategories */}
				<Card className="p-5 gap-4 lg:col-span-2 xl:col-span-1">
					<StatisticsCategoriesSkeleton />
				</Card>
			</div>
			{/* Skeleton para Resúmenes mensuales y trimestrales */}
			<Card className="p-5 px-6 gap-4 flex-row">
				<div className="w-full">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-5" />
							<Skeleton className="h-6 w-px" />
							<Skeleton className="h-6 w-32" />
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-10 w-24" />
						</div>
					</div>
					<Skeleton className="h-px w-full my-4" />
					<div className="space-y-4">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
				<div className="w-full">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-5" />
							<Skeleton className="h-6 w-px" />
							<Skeleton className="h-6 w-32" />
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-10 w-24" />
						</div>
					</div>
					<Skeleton className="h-px w-full my-4" />
					<div className="space-y-4">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
			</Card>
			{/* Skeleton para Balance anual */}
			<Card className="p-5 gap-2">
				<Skeleton className="h-8 w-48 mb-4" />
				<Skeleton className="h-40 w-full" />
			</Card>
		</>
	);
}
