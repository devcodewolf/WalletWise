import { getTransactions } from '@/actions/transactions';

import type { TransactionWithRelations } from '@/types/transactions.types';
import { BarChart3, CircleDollarSign } from 'lucide-react';
import StatisticsMonth from '@/components/statistics/statistics-month';
import StatisticsYear from '@/components/statistics/statistics-year';
import StatisticsCategories from '@/components/statistics/statistics-categories';
import StatisticsSumary from '@/components/statistics/statistics-sumary';
import { AnnualBalance } from '@/components/statistics/annual-balance';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Suspense } from 'react';
import { StatisticsYearSkeleton } from '@/components/statistics/statistics-year-skeleton';
import { StatisticsMonthSkeleton } from '@/components/statistics/statistics-month-skeleton';
import { StatisticsCategoriesSkeleton } from '@/components/statistics/statistics-categories-skeleton';

// Forzar el renderizado dinámico de la página
export const dynamic = 'force-dynamic';

export default async function StatisticsPage() {
	const respTransaction = await getTransactions();

	// soluciona problema de typos porque la respuesta puede ser de varios tipos union
	const transactions: TransactionWithRelations[] =
		respTransaction.success && 'data' in respTransaction
			? respTransaction.data
			: [];

	return (
		<div className="py-4 px-1 space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-2xl font-bold flex items-center gap-2">
						<BarChart3 className="size-6" />
						<Separator
							orientation="vertical"
							className="data-[orientation=vertical]:h-6"
						/>
						Estadísticas
					</h2>
					<p className="text-gray-400 mt-1">
						Análisis detallado de tus finanzas
					</p>
				</div>
			</div>
			<Separator />

			{/* Gráficos en 36columnas */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
				{/* grafico anual	 */}
				<Card className="p-5 gap-4">
					<Suspense fallback={<StatisticsYearSkeleton />}>
						<StatisticsYear transactions={transactions} />
					</Suspense>
				</Card>
				{/* Gráfico mensual */}
				<Card className="p-5 gap-4">
					<Suspense fallback={<StatisticsMonthSkeleton />}>
						<StatisticsMonth transactions={transactions} />
					</Suspense>
				</Card>
				<Card className="p-5 gap-4 lg:col-span-2 xl:col-span-1">
					<Suspense fallback={<StatisticsCategoriesSkeleton />}>
						<StatisticsCategories transactions={transactions} />
					</Suspense>
				</Card>
			</div>
			{/* Resúmenes mensuales y trimestrales */}
			<Card className="p-5 px-6 gap-4">
				<StatisticsSumary transactions={transactions} />
			</Card>
			{/* Balance anual */}
			<Card className="p-5 gap-2">
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
			</Card>
		</div>
	);
}
