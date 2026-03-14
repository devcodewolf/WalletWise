'use client'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function WalletCardSkeleton() {
	return (
		<Card className='overflow-hidden py-0 border-none bg-card/50'>
			{/* Top half skeleton mimicking the colored section */}
			<div className='p-6 space-y-3 bg-muted/20'>
				<div className='flex justify-between items-start mb-3'>
					<Skeleton className='size-12 rounded-lg bg-muted-foreground/10' />
					<Skeleton className='h-4 w-12 rounded bg-muted-foreground/10' />
				</div>
				<Skeleton className='h-5 w-3/4 bg-muted-foreground/10' />
				<Skeleton className='h-8 w-1/2 bg-muted-foreground/10' />
			</div>

			{/* Bottom half skeleton */}
			<div className='p-5 space-y-4'>
				<div className='grid grid-cols-2 gap-3'>
					<div className='bg-muted/30 rounded-xl p-3 space-y-2 border border-white/5'>
						<Skeleton className='h-2 w-16' />
						<Skeleton className='h-4 w-20' />
					</div>
					<div className='bg-muted/30 rounded-xl p-3 space-y-2 border border-white/5'>
						<Skeleton className='h-2 w-16' />
						<Skeleton className='h-4 w-20' />
					</div>
				</div>

				<div className='space-y-2'>
					<Skeleton className='h-2 w-24 ml-1' />
					<div className='bg-muted/30 rounded-xl p-3 flex items-center gap-3 border border-white/5'>
						<Skeleton className='size-8 rounded-full' />
						<div className='flex-1 space-y-2'>
							<Skeleton className='h-3 w-24' />
							<Skeleton className='h-2 w-12' />
						</div>
						<Skeleton className='h-4 w-12' />
					</div>
				</div>
			</div>
		</Card>
	)
}

export function WalletPanelSkeleton() {
	return (
		<div className='space-y-4'>
			{/* Top Summary Cards Skeleton */}
			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
				{[...Array(3)].map((_, i) => (
					<Card
						key={i}
						className='flex flex-row items-center gap-4 p-5 border-none bg-card/50'>
						<Skeleton className='size-12 rounded-xl bg-muted-foreground/10' />
						<div className='flex flex-col gap-2'>
							<Skeleton className='h-2 w-20' />
							<Skeleton className='h-5 w-24' />
						</div>
					</Card>
				))}
			</div>

			{/* Grid of Wallet Cards Skeleton */}
			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4'>
				{[...Array(5)].map((_, i) => (
					<WalletCardSkeleton key={i} />
				))}
			</div>
		</div>
	)
}
