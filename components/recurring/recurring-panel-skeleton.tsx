'use client'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function RecurringCardSkeleton() {
	return (
		<Card className='relative overflow-hidden flex flex-col justify-between py-0 border border-muted bg-card/50 shadow-sm'>
			<div className='p-5 space-y-4 flex-1'>
				<div className='flex justify-between items-start gap-4'>
					{/* Logo y título */}
					<div className='flex items-center gap-3 w-full'>
						<Skeleton className='size-8 rounded-md shrink-0' />
						<Skeleton className='h-5 w-2/3' />
					</div>

					{/* Botones de acción */}
					<div className='flex items-center gap-2 shrink-0'>
						<Skeleton className='size-6 rounded-md' />
						<Skeleton className='size-6 rounded-md' />
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<Skeleton className='h-3 w-16' />
					<Skeleton className='h-5 w-20 rounded-full' />
				</div>

				<div className='flex items-end justify-between'>
					<div className='space-y-2 mt-2'>
						<Skeleton className='h-8 w-28' />
						<Skeleton className='h-3 w-16' />
					</div>
					<div className='flex flex-col items-end gap-2'>
						<Skeleton className='h-6 w-28 rounded-full' />
						<Skeleton className='h-3 w-32' />
					</div>
				</div>
			</div>

			{/* Bottom Action Area / Info */}
			<div className='border-t px-5 py-3 bg-muted/20 flex justify-between rounded-b-xl'>
				<Skeleton className='h-4 w-40' />
			</div>
		</Card>
	)
}

export function RecurringPanelSkeleton() {
	return (
		<div className='space-y-4'>
			{/* Top Summary Cards Skeleton */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{[...Array(4)].map((_, i) => (
					<Card
						key={i}
						className='flex flex-row items-center gap-4 p-5 border border-muted bg-card/50 shadow-sm'>
						<Skeleton className='size-12 rounded-xl shrink-0' />
						<div className='flex flex-col gap-2 w-full'>
							<Skeleton className='h-3 w-1/2' />
							<Skeleton className='h-6 w-3/4' />
						</div>
					</Card>
				))}
			</div>

			{/* Grid of Recurring Cards Skeleton */}
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-4'>
				{[...Array(6)].map((_, i) => (
					<RecurringCardSkeleton key={i} />
				))}
			</div>
		</div>
	)
}
