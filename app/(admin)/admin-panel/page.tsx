import { getTransactions } from '@/actions/transactions'
// import { TransactionsDashboard } from '@/components/dashboard/transactions-dashboard'
import type { TransactionWithRelations } from '@/types/transactions.types'
import { YearlyChart } from '@/components/statistics/chart-yearly'
import { ChevronLeft, ChevronRight, HomeIcon } from 'lucide-react'
// import { AddTransaction } from '@/components/transactions/add-transaction'
import { Card, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ExpenseTracker } from '@/components/dashboard/expense-tracker'
import { RecurringAlert } from '@/components/transactions/recurring-alert'
import { CurrentDay } from '@/components/dashboard/current-day'
import { Suspense } from 'react'
import DashboardPageSkeleton from '@/components/dashboard/dashboard-page-skeleton'
import { WelcomeDashboard } from '@/components/dashboard/welcome-dashboard'
import { MonthlyBalanceServer } from '@/components/dashboard/monthly-balance-server'
import { MonthlyBalanceSkeleton } from '@/components/dashboard/monthly-balance-skeleton'

// Forzar el renderizado dinámico de la página
// export const dynamic = 'force-dynamic';
async function AdminPanelData() {
	// Obtener transacciones
	const respTransaction = await getTransactions()

	// Procesar la respuesta de transacciones
	const transactions: TransactionWithRelations[] =
		respTransaction.success && 'data' in respTransaction
			? respTransaction.data
			: []

	// Filtrar transacciones para el año actual en el servidor
	const currentYear = new Date().getFullYear()
	const yearlyTransactions = transactions.filter((t) => {
		const date = t.date instanceof Date ? t.date : new Date(t.date)
		return date.getFullYear() === currentYear
	})

	return (
		<>
			{/* // dashboard */}

			{/* <ExpenseTrackerSkeleton /> */}
			<div className='flex items-center w-fit gap-4 ml-auto'>
				{/* botton avanzar */}
				<button className='size-8 flex items-center justify-center bg-card hover:bg-card/0 rounded-[8px]'>
					<ChevronLeft />
				</button>
				<p className='text-sm font-semibold'>Marzo 2026</p>
				<button className='size-8 flex items-center justify-center bg-card hover:bg-card/0 rounded-[8px]'>
					<ChevronRight />
				</button>
			</div>

			<ExpenseTracker data={transactions} />
			<div className='grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[calc(100vh-20rem)]'>
				<Card className='p-6 gap-4 justify-between row-span-2 col-span-1 lg:col-span-2 xl:col-span-3 min-h-0 overflow-hidden'>
					<CardHeader className='flex-col gap-4 p-0'>
						<div>
							{/* <h2 className='text-xl font-bold flex items-center gap-2'>
										<ChartSpline className='size-6' />
										<Separator
											orientation='vertical'
											className='data-[orientation=vertical]:h-6'
										/>
										Estadística anual - {currentYear}
									</h2> */}
							<p className='text-gray-400 text-xl mt-1'>
								Estadísticas anual {currentYear}
							</p>
						</div>
						{/* <Separator /> */}
					</CardHeader>
					{/* <ChartYearlySkeleton /> */}
					<YearlyChart transactions={yearlyTransactions} />
				</Card>
				<div className='flex flex-col md:col-span-1 lg:col-span-2 xl:col-span-1'>
					<Card className='p-6'>
						<CurrentDay />
					</Card>
				</div>
			</div>

			{/* 
				<Card className='p-6 gap-4'>
					<CardHeader className='block md:flex md:flex-row items-center p-0'>
						<div className='mb-3 md:mb-0'>
							<h2 className='text-2xl font-bold flex items-center gap-2'>
								<HandCoins className='size-6' />
								<Separator
									orientation='vertical'
									className='data-[orientation=vertical]:h-6'
								/>
								Resúmen
							</h2>
							<p className='text-gray-400 mt-1'>Resúmen de tus finanzas</p>
						</div>
						<AddTransaction />
					</CardHeader>
					<Separator />
					<TransactionsDashboardSkeleton />
					<TransactionsDashboard data={transactions} />
				</Card> */}
		</>
	)
}

export default function AdminPanel() {
	return (
		<>
			<div className='flex gap-5'>
				<div className='w-3/12'>
					<WelcomeDashboard />

					{/* Gráfico balance mensual */}
					<Suspense fallback={<MonthlyBalanceSkeleton />}>
						<MonthlyBalanceServer />
					</Suspense>
				</div>
				<div className='w-9/12 space-y-4'>
					{/* <DashboardPageSkeleton /> */}
					<Suspense fallback={<DashboardPageSkeleton />}>
						<AdminPanelData />
					</Suspense>
				</div>
			</div>
		</>
	)
}
