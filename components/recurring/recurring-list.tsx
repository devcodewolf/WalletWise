import { DataTable } from '@/components/ui/data-table'
import { columns } from './recurringColumns'
import { getRecurringTransactions } from '@/actions/recurring'

interface RecurringListProps {
	limitShow?: number
}

export const RecurringList = async ({ limitShow }: RecurringListProps) => {
	const respRecurring = await getRecurringTransactions()
	const recurring =
		respRecurring.success && 'data' in respRecurring ? respRecurring.data : []

	return <DataTable columns={columns} data={recurring} limitShow={limitShow} />
}
