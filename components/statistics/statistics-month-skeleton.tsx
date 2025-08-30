'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const StatisticsMonthSkeleton = () => {
	return (
		<>
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-6 w-px" />
					<Skeleton className="h-6 w-24" />
				</div>
				<div className="flex items-center gap-2">
					<Skeleton className="h-10 w-32" />
					<Skeleton className="h-10 w-24" />
				</div>
			</div>
			<Skeleton className="h-px w-full" />
			<div className="min-h-[225px] h-[225px] w-9/12 mx-auto p-4 border rounded-md">
				<div className="flex items-end justify-center h-full gap-12">
					<Skeleton className="h-[70%] w-16" />
					<Skeleton className="h-[90%] w-16" />
				</div>
			</div>
		</>
	);
};
