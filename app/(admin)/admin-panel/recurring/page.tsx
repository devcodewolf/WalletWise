import { RecurringPanelSkeleton } from '@/components/recurring/recurring-panel-skeleton'

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
			<div className='pt-2'>
				<Suspense fallback={<RecurringPanelSkeleton />}>
					<RecurringList />
				</Suspense>
			</div>
		</>
	)
}
