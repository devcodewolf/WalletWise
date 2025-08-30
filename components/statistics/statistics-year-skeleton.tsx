'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ChartYearlySkeleton } from './chart-yearly-skeleton';

export const StatisticsYearSkeleton = () => {
	return (
		<>
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-6 w-px" />
					<Skeleton className="h-6 w-24" />
				</div>
				<div className="flex items-center gap-2">
					<Skeleton className="h-10 w-24" />
				</div>
			</div>
			<Skeleton className="h-px w-full" />
			<ChartYearlySkeleton />
		</>
	);
};
