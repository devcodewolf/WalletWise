import { getTransactions } from '@/actions/transactions';

import type { TransactionWithRelations } from '@/types/transactions.types';
import { BarChart3, Calendar, PieChart, TrendingUp } from 'lucide-react';
import StatisticsMonth from '@/components/statistics/statistics-month';
import StatisticsYear from '@/components/statistics/statistics-year';
import StatisticsCategories from '@/components/statistics/statistics-categories';

export default async function StatisticsPage() {
	const respTransaction = await getTransactions();

	// soluciona problema de typos porque la respuesta puede ser de varios tipos union
	const transactions: TransactionWithRelations[] =
		respTransaction.success && 'data' in respTransaction
			? respTransaction.data
			: [];

	return (
		<div className="py-4 px-12">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div>
					<h1 className="text-3xl font-bold flex items-center gap-2">
						<BarChart3 className="h-8 w-8" />
						Estadísticas
					</h1>
					<p className="text-gray-400 mt-1">
						Análisis detallado de tus finanzas
					</p>
				</div>
			</div>

			{/* Gráficos en 36columnas */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* grafico anual	 */}
				<div className="col-span-12 lg:col-span-6 rounded-xl bg-muted/50 p-6 pb-3">
					<div className="flex items-center gap-2 text-white text-md font-semibold mb-2">
						<Calendar className="h-5 w-5" />
						Anual
					</div>
					<StatisticsYear transactions={transactions} />
				</div>
				<div className="col-span-12 lg:col-span-3 rounded-xl bg-muted/50 p-6 pb-3">
					<div className="flex items-center gap-2 text-white text-md font-semibold mb-2">
						<TrendingUp className="h-5 w-5" />
						Mensual
					</div>
					<StatisticsMonth transactions={transactions} />
				</div>
				<div className="col-span-12 lg:col-span-3 rounded-xl bg-muted/50 p-6 pb-3">
					<div className="flex items-center gap-2 text-white text-md font-semibold mb-2">
						<PieChart className="h-5 w-5" />
						Resumen categorías
					</div>
					<StatisticsCategories transactions={transactions} />
				</div>
			</div>
		</div>
	);
}
