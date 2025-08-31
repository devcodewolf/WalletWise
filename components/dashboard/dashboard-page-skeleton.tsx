import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { StatisticsYearSkeleton } from '@/components/statistics/statistics-year-skeleton';

import { ExpenseTrackerSkeleton } from '@/components/dashboard/expense-tracker-skeleton';
import { TransactionsDashboardSkeleton } from '@/components/dashboard/transactions-dashboard-skeleton';

export default function DashboardPageSkeleton() {
	return (
		<>
			<ExpenseTrackerSkeleton />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
				<Card className="p-4 flex items-center justify-center w-full sm:w-1/2 md:w-full md:col-span-1 lg:col-span-2 xl:col-span-1">
					{/* Cabecera del Calendario */}
					<div className="flex items-center justify-between mb-4 gap-2">
						<Skeleton className="h-6 w-6" />
						<Skeleton className="h-6 w-32" />
						<Skeleton className="h-6 w-6" />
					</div>

					{/* Días del mes */}
					<div className="grid grid-cols-7 gap-2">
						{Array.from({ length: 35 }).map((_, i) => (
							<Skeleton key={i} className="h-8 w-8 rounded-full" />
						))}
					</div>
				</Card>
				<Card className="p-6 gap-4 justify-between col-span-1 lg:col-span-2 xl:col-span-3">
					<StatisticsYearSkeleton />
				</Card>
			</div>
			<TransactionsDashboardSkeleton />
		</>
	);
}
