import { TableListSkeleton } from '@/components/table-list-skeleton'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import HeaderRecurring from '@/components/recurring/header-recurring'
import { RecurringList } from '@/components/recurring/recurring-list'
import { Suspense } from 'react'

export default function RecurringPage() {
	return (
		<>
			<div className='pt-4'>
				<HeaderRecurring />
			</div>
			<Separator className='mt-4 mb-6' />
			<Card className='p-6 gap-4'>
				<Suspense fallback={<TableListSkeleton />}>
					<RecurringList />
				</Suspense>
			</Card>
		</>
	)
}
