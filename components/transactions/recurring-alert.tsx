import { getPendingRecurringTransactions } from '@/actions/transactions'
import { RecurringAlertClient } from './recurring-alert-client'
import { PendingRecurringOccurrence } from '@/types/transactions.types'

export async function RecurringAlert({ className }: { className?: string }) {
	const res = await getPendingRecurringTransactions()

	if (!res.success || !('data' in res) || !Array.isArray(res.data)) {
		return null
	}

	const pending = res.data as PendingRecurringOccurrence[]

	if (pending.length === 0) {
		return null
	}

	return <RecurringAlertClient className={className} initialPending={pending} />
}
