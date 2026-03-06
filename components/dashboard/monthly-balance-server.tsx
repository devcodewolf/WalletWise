import { getTransactions } from '@/actions/transactions'
import type { Transaction } from '@prisma/client'
import { MonthlyBalanceChartClient } from './monthly-balance-chart'

const MONTH_NAMES = [
	'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
	'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function getMonthlyTotals(transactions: Transaction[]) {
	const now = new Date()
	const currentMonth = now.getMonth()
	const currentYear = now.getFullYear()

	const monthTxs = transactions.filter((t) => {
		const d = new Date(t.date)
		return d.getMonth() === currentMonth && d.getFullYear() === currentYear
	})

	const income = monthTxs
		.filter((t) => t.type === 'Ingreso')
		.reduce((sum, t) => sum + t.amount, 0)

	const expense = Math.abs(
		monthTxs
			.filter((t) => t.type === 'Gasto')
			.reduce((sum, t) => sum + t.amount, 0)
	)

	return {
		income,
		expense,
		balance: income - expense,
		month: `${MONTH_NAMES[currentMonth]} ${currentYear}`,
	}
}

export async function MonthlyBalanceServer() {
	const resp = await getTransactions()

	const transactions: Transaction[] =
		resp.success && 'data' in resp ? resp.data : []

	const { income, expense, balance, month } = getMonthlyTotals(transactions)

	return (
		<MonthlyBalanceChartClient
			income={income}
			expense={expense}
			balance={balance}
			month={month}
		/>
	)
}
