import { getTransactions } from '@/actions/transactions'
import type { Transaction } from '@prisma/client'
import { MonthlyBalanceChartClient } from './monthly-balance-chart'
import { monthLabel } from '@/lib/constants'

function getMonthlyTotals(
	transactions: Transaction[],
	month: number, // 1-12
	year: number
) {
	const targetMonth = month - 1 // convertir a 0-11

	const monthTxs = transactions.filter((t) => {
		const d = new Date(t.date)
		return d.getMonth() === targetMonth && d.getFullYear() === year
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
		month: monthLabel(month, year),
	}
}

interface MonthlyBalanceServerProps {
	year: number
	month: number // 1-12
}

export async function MonthlyBalanceServer({
	year,
	month,
}: MonthlyBalanceServerProps) {
	const resp = await getTransactions()

	const transactions: Transaction[] =
		resp.success && 'data' in resp ? resp.data : []

	const {
		income,
		expense,
		balance,
		month: monthLabelStr,
	} = getMonthlyTotals(transactions, month, year)

	return (
		<MonthlyBalanceChartClient
			income={income}
			expense={expense}
			balance={balance}
			month={monthLabelStr}
		/>
	)
}
