'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const TransactionsDashboardSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-6 w-px" />
					<Skeleton className="h-6 w-32" />
				</div>
				<div className="rounded-md border p-4 space-y-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-6 w-px" />
					<Skeleton className="h-6 w-32" />
				</div>
				<div className="rounded-md border p-4 space-y-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			</div>
		</div>
	);
};
