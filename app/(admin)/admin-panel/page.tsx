import { getTransactions } from '@/actions/transactions';
import { TransactionsDashboard } from '@/components/dashboard/transactions-dashboard';
import type { TransactionWithRelations } from '@/types/transactions.types';
import { YearlyChart } from '@/components/statistics/chart-yearly';
import { ChartSpline, HandCoins } from 'lucide-react';
import { AddTransaction } from '@/components/transactions/add-transaction';
import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExpenseTracker } from '@/components/dashboard/expense-tracker';
import Calendar01 from '@/components/dashboard/calendar-01';

export default async function AdminPanel() {
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
		// dashboard
		<div className="flex flex-1 flex-col gap-4 ">
			<ExpenseTracker data={transactions} />
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<Card className="py-0">
					<Calendar01 />
				</Card>
				<Card className="p-6 gap-4 md:col-span-2">
					<CardHeader className="flex-row items-center p-0">
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
					</CardHeader>
					<Separator />
					<YearlyChart transactions={yearlyTransactions} />
				</Card>
			</div>

			<Card className="p-6 gap-4">
				<CardHeader className="flex-row items-center p-0">
					<div>
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

				<TransactionsDashboard data={transactions} />
			</Card>
		</div>
	);
}
