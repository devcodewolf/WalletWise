import { getTransactions } from '@/actions/transactions';

import type { TransactionWithRelations } from '@/types/transactions.types';
import {
	BarChart3,
	Calendar,
	CircleDollarSign,
	PieChart,
	TrendingUp,
} from 'lucide-react';
import StatisticsMonth from '@/components/statistics/statistics-month';
import StatisticsYear from '@/components/statistics/statistics-year';
import StatisticsCategories from '@/components/statistics/statistics-categories';
import { SummaryMonthly } from '@/components/statistics/summary-monthly';
import StatisticsSumary from '@/components/statistics/statistics-sumary';
import { AnnualBalance } from '@/components/statistics/annual-balance';

export default async function StatisticsPage() {
	const respTransaction = await getTransactions();

	// soluciona problema de typos porque la respuesta puede ser de varios tipos union
	const transactions: TransactionWithRelations[] =
		respTransaction.success && 'data' in respTransaction
			? respTransaction.data
			: [];

	return (
		<div className="py-4 px-12 space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-3xl font-bold flex items-center gap-2">
						<BarChart3 className="h-8 w-8" />
						Estadísticas
					</h2>
					<p className="text-gray-400 mt-1">
						Análisis detallado de tus finanzas
					</p>
				</div>
			</div>

			{/* Gráficos en 36columnas */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-12 gap-4">
				{/* grafico anual	 */}
				<div className="rounded-xl border border-gray-300 bg-muted/50 px-6 pb-1 pt-4 2xl:col-span-6 dark:border-gray-800">
					<StatisticsYear transactions={transactions} />
				</div>
				{/* Gráfico mensual */}
				<div className="rounded-xl border border-gray-300 bg-muted/50 px-6 pb-1 pt-4 2xl:col-span-3 dark:border-gray-800">
					<StatisticsMonth transactions={transactions} />
				</div>
				<div className="rounded-xl border border-gray-300 bg-muted/50 px-6 pt-4 flex flex-col 2xl:col-span-3 dark:border-gray-800">
					<StatisticsCategories transactions={transactions} />
				</div>
			</div>
			{/* Resúmenes mensuales y trimestrales */}
			<div className="rounded-xl border border-gray-300 bg-muted/50 px-6 py-4 2xl:col-span-12 dark:border-gray-800">
				<StatisticsSumary transactions={transactions} />
			</div>
			{/* Balance anual */}
			<div className="rounded-xl border border-gray-300 bg-muted/50 px-6 py-4 2xl:col-span-12 dark:border-gray-800">
				<div className="mb-4">
					<div className="flex items-center gap-2">
						<CircleDollarSign className="size-5" />
						<h3 className="text-xl font-semibold leading-none flex items-center gap-2">
							Balance Anual
						</h3>
					</div>
					<p className="text-sm text-gray-400 mt-1">
						Resumen financiero por años
					</p>
				</div>
				<AnnualBalance transactions={transactions} />
			</div>
		</div>
	);
}
