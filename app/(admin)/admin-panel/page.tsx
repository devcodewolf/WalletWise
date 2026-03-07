import { getTransactions, getAvailableMonths } from '@/actions/transactions'
import type { TransactionWithRelations } from '@/types/transactions.types'
import { YearlyChart } from '@/components/statistics/chart-yearly'
import { Card, CardHeader } from '@/components/ui/card'
import { ExpenseTracker } from '@/components/dashboard/expense-tracker'
import { CurrentDay } from '@/components/dashboard/current-day'
import { Suspense } from 'react'
import DashboardPageSkeleton from '@/components/dashboard/dashboard-page-skeleton'
import { WelcomeDashboard } from '@/components/dashboard/welcome-dashboard'
import { MonthlyBalanceServer } from '@/components/dashboard/monthly-balance-server'
import { MonthlyBalanceSkeleton } from '@/components/dashboard/monthly-balance-skeleton'
import { MonthNavigator } from '@/components/dashboard/month-navigator'

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
			<div className='grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[calc(100vh-20rem)]'>
				<Card className='p-6 gap-4 justify-between row-span-2 col-span-1 lg:col-span-2 xl:col-span-3 min-h-0 overflow-hidden'>
					<CardHeader className='flex-col gap-4 p-0'>
						<div>
							<p className='text-gray-400 text-xl mt-1'>
								Estadísticas anual {year}
							</p>
						</div>
					</CardHeader>
					<YearlyChart transactions={yearlyTransactions} />
				</Card>
				<div className='flex flex-col md:col-span-1 lg:col-span-2 xl:col-span-1'>
					<Card className='p-6'>
						<CurrentDay />
					</Card>
				</div>
			</div>
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
				<Suspense>
					<MonthNavigator availableMonths={availableMonths} />
				</Suspense>
				<p className='text-[11px] text-gray-400 mb-2 mr-2 mt-3 text-right'>
					(*) Datos comparativos 3 meses anteriores
				</p>
			</div>
			<div className='flex gap-5'>
				<div className='w-3/12'>
					<WelcomeDashboard />

					{/* Gráfico balance mensual */}
					<Suspense fallback={<MonthlyBalanceSkeleton />}>
						<MonthlyBalanceServer year={year} month={month} />
					</Suspense>
				</div>
				<div className='w-9/12 space-y-4'>
					<Suspense fallback={<DashboardPageSkeleton />}>
						<AdminPanelData year={year} month={month} />
					</Suspense>
				</div>
			</div>
		</>
	)
}
