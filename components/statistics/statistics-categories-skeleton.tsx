'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const StatisticsCategoriesSkeleton = () => {
	return (
		<>
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
			<Skeleton className="h-px w-full" />
			<div className="flex items-center gap-4 flex-1 py-4">
				<div className="w-6/12 flex flex-col items-center gap-2">
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-24 w-24 rounded-full" />
				</div>
				<div className="w-6/12 flex flex-col items-center gap-2">
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-24 w-24 rounded-full" />
				</div>
			</div>
		</>
	);
};
