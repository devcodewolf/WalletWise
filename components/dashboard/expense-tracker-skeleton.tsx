import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function ExpenseTrackerSkeleton() {
	return (
		<section>
			<Skeleton className="h-4 w-64 mb-2 ml-auto" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index} className="gap-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-16" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-32 mb-2" />
							<Skeleton className="h-3 w-48" />
							<Skeleton className="h-3 w-40 mt-1" />
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
