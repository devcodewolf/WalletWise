'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const ChartYearlySkeleton = () => {
	return (
		<div className="min-h-[225px] h-[225px] w-full p-4 border rounded-md">
			<div className="flex items-end justify-center h-full gap-4 *:w-12 *:lg:w-8 ">
				<Skeleton className="h-[60%]" />
				<Skeleton className="h-[80%]" />
				<Skeleton className="h-[40%]" />
				<Skeleton className="h-[70%]" />
				<Skeleton className="h-[50%]" />
				<Skeleton className="h-[90%]" />
				<Skeleton className="h-[65%]" />
				<Skeleton className="h-[35%] hidden xl:block" />
				<Skeleton className="h-[75%] hidden xl:block" />
				<Skeleton className="h-[55%] hidden xl:block" />
				<Skeleton className="h-[85%] hidden xl:block" />
				<Skeleton className="h-[45%] hidden xl:block" />
				<Skeleton className="h-[60%] hidden xl:block" />
				<Skeleton className="h-[80%] hidden xl:block" />
				<Skeleton className="h-[40%] hidden xl:block" />
				<Skeleton className="h-[85%] hidden xl:block" />
				<Skeleton className="h-[45%] hidden xl:block" />
			</div>
		</div>
	);
};
