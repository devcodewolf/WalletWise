import { getTransactions, getAvailableMonths } from '@/actions/transactions'
import type { TransactionWithRelations } from '@/types/transactions.types'
import { YearlyChartSwitcher } from '@/components/statistics/yearly-chart-switcher'
import { Card } from '@/components/ui/card'
import { ExpenseTracker } from '@/components/dashboard/expense-tracker'
import { CurrentDay } from '@/components/dashboard/current-day'
import { Suspense } from 'react'
import DashboardPageSkeleton from '@/components/dashboard/dashboard-page-skeleton'
import { WelcomeDashboard } from '@/components/dashboard/welcome-dashboard'
import { MonthlyBalanceServer } from '@/components/dashboard/monthly-balance-server'
import { MonthlyBalanceSkeleton } from '@/components/dashboard/monthly-balance-skeleton'
import { MonthNavigator } from '@/components/dashboard/month-navigator'
import { MonthNavigatorSkeleton } from '@/components/dashboard/month-navigator-skeleton'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'

// searchParams tipados como Promise para Next.js 15
type PageProps = {
	searchParams: Promise<{ year?: string; month?: string }>
}

async function AdminPanelData({
	year,
	month,
}: {
	year: number
	month: number // 1-12
}) {
	const respTransaction = await getTransactions()

	const transactions: TransactionWithRelations[] =
		respTransaction.success && 'data' in respTransaction
			? respTransaction.data
			: []

	// Filtrar transacciones del año seleccionado para el gráfico anual
	const yearlyTransactions = transactions.filter((t) => {
		const date = t.date instanceof Date ? t.date : new Date(t.date)
		return date.getFullYear() === year
	})

	return (
		<>
			<ExpenseTracker
				data={transactions}
				referenceMonth={month - 1} // convertir a 0-11
				referenceYear={year}
			/>
			<section className='grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:h-[calc(100vh-18rem)] 2xl:h-[calc(100vh-26rem)]'>
				<Card className='p-7 gap-4 justify-between row-span-2 col-span-1 lg:col-span-3 min-h-0 overflow-hidden'>
					<YearlyChartSwitcher transactions={yearlyTransactions} year={year} />
				</Card>
				<div className='flex flex-col md:col-span-1 lg:col-span-1 row-span-2 gap-4'>
					<Card className='p-6'>
						<CurrentDay />
					</Card>
					<Card className='px-5 py-5 flex-1 overflow-hidden max-h-96 md:max-h-none'>
						<RecentTransactions transactions={transactions} />
					</Card>
				</div>
			</section>
		</>
	)
}

export default async function AdminPanel({ searchParams }: PageProps) {
	// Ambas queries en paralelo para no bloquear
	const [params, availableMonths] = await Promise.all([
		searchParams,
		getAvailableMonths(),
	])

	// Si no hay searchParams, usamos el último mes con datos (primero de la lista desc)
	// Si no hay datos en absoluto, fallback al mes actual
	const now = new Date()
	const fallback = availableMonths[0] ?? {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
	}

	const year = parseInt(params.year ?? String(fallback.year))
	const month = parseInt(params.month ?? String(fallback.month))

	return (
		<>
			<div>
				{/* Navegación entre meses con datos */}
				<Suspense fallback={<MonthNavigatorSkeleton />}>
					<MonthNavigator availableMonths={availableMonths} />
				</Suspense>
			</div>
			<div className='2xl:flex gap-12'>
				<div className='2xl:w-2/12 md:flex 2xl:flex-col justify-between gap-4 mb-4 2xl:mb-0 space-y-2 pt-8'>
					{/* bienvenido */}
					<div className='md:w-1/3 2xl:w-full'>
						<WelcomeDashboard />
					</div>

					{/* Gráfico balance mensual */}
					<Suspense fallback={<MonthlyBalanceSkeleton />}>
						<MonthlyBalanceServer year={year} month={month} />
					</Suspense>
				</div>
				<div className='2xl:w-10/12 space-y-4'>
					<Suspense fallback={<DashboardPageSkeleton />}>
						<AdminPanelData year={year} month={month} />
					</Suspense>
				</div>
			</div>
		</>
	)
}
