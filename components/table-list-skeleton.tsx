'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const TableListSkeleton = () => {
	return (
		<div className="p-6 space-y-4">
			<div className="flex justify-end gap-2 items-center">
				<Skeleton className="h-10 w-24" />
				<Skeleton className="h-10 w-24" />
			</div>
			<Skeleton className="h-px w-full" />
			<div className="rounded-md border">
				<div className=" w-full p-4 space-y-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			</div>
		</div>
	);
};
