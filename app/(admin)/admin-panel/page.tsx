import { getTransactions } from '@/actions/transactions';
import { TransactionsDashboard } from '@/components/dashboard/transactions-dashboard';
import type { TransactionWithRelations } from '@/types/transactions.types';
import { YearlyChart } from '@/components/statistics/chart-yearly';
import { ChartSpline, HandCoins, HomeIcon } from 'lucide-react';
import { AddTransaction } from '@/components/transactions/add-transaction';
import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExpenseTracker } from '@/components/dashboard/expense-tracker';
import Calendar01 from '@/components/dashboard/calendar-01';
import { Suspense } from 'react';
import DashboardPageSkeleton from '@/components/dashboard/dashboard-page-skeleton';

// Forzar el renderizado dinámico de la página
// export const dynamic = 'force-dynamic';
async function AdminPanelData() {
	// Obtener transacciones
	const respTransaction = await getTransactions();

	// Procesar la respuesta de transacciones
	const transactions: TransactionWithRelations[] =
		respTransaction.success && 'data' in respTransaction
			? respTransaction.data
			: [];

	// Filtrar transacciones para el año actual en el servidor
	const currentYear = new Date().getFullYear();
	const yearlyTransactions = transactions.filter((t) => {
		const date = t.date instanceof Date ? t.date : new Date(t.date);
		return date.getFullYear() === currentYear;
	});

	return (
		<>
			{/* // dashboard */}
			<div className="flex flex-1 flex-col gap-4">
				{/* <ExpenseTrackerSkeleton /> */}
				<ExpenseTracker data={transactions} />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<Card className="p-4 flex items-center justify-center w-full sm:w-1/2 md:w-full md:col-span-1 lg:col-span-2 xl:col-span-1">
						<Calendar01 />
					</Card>
					<Card className="p-6 gap-4 justify-between col-span-1 lg:col-span-2 xl:col-span-3">
						<CardHeader className="flex-col gap-4 p-0">
							<div>
								<h2 className="text-2xl font-bold flex items-center gap-2">
									<ChartSpline className="size-6" />
									<Separator
										orientation="vertical"
										className="data-[orientation=vertical]:h-6"
									/>
									Estadística anual
								</h2>
								<p className="text-gray-400 mt-1">
									Estadísticas año actual {currentYear}
								</p>
							</div>
							<Separator />
						</CardHeader>
						{/* <ChartYearlySkeleton /> */}
						<YearlyChart transactions={yearlyTransactions} />
					</Card>
				</div>

				<Card className="p-6 gap-4">
					<CardHeader className="block md:flex md:flex-row items-center p-0">
						<div className="mb-3 md:mb-0">
							<h2 className="text-2xl font-bold flex items-center gap-2">
								<HandCoins className="size-6" />
								<Separator
									orientation="vertical"
									className="data-[orientation=vertical]:h-6"
								/>
								Resúmen
							</h2>
							<p className="text-gray-400 mt-1">Resúmen de tus finanzas</p>
						</div>
						<AddTransaction />
					</CardHeader>
					<Separator />
					{/* <TransactionsDashboardSkeleton /> */}
					<TransactionsDashboard data={transactions} />
				</Card>
			</div>
		</>
	);
}

export default function AdminPanel() {
	return (
		<div className="py-4 px-1 space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-2xl font-bold flex items-center gap-2">
						<HomeIcon className="size-6" />
						<Separator
							orientation="vertical"
							className="data-[orientation=vertical]:h-6"
						/>
						Dashboard
					</h2>
				</div>
			</div>
			<Separator />
			{/* <DashboardPageSkeleton /> */}
			<Suspense fallback={<DashboardPageSkeleton />}>
				<AdminPanelData />
			</Suspense>
		</div>
	);
}
