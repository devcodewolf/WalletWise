import { Skeleton } from '@/components/ui/skeleton';

export const TransactionListSkeleton = () => {
	return (
		<div className="p-4">
			<div className="flex items-center flex-wrap gap-4 mb-4">
				<Skeleton className="h-10 w-48" />
				<Skeleton className="h-10 w-28" />
				<Skeleton className="h-10 w-28" />
			</div>
			<div className="rounded-md border">
				<div className="w-full p-4 space-y-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
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
