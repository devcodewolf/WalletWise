import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export function ExpenseTrackerSkeleton() {
	return (
		<section>
			{/* 4 metric cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i} className='gap-0'>
						<CardHeader className='flex flex-row items-center justify-between pb-2'>
							<Skeleton className='h-4 w-28' />
							<Skeleton className='h-4 w-14' />
						</CardHeader>
						<CardContent className='space-y-2'>
							<Skeleton className='h-8 w-36' />
							<Skeleton className='h-3 w-48' />
							<Skeleton className='h-3 w-40' />
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}
