'use client';

import { YearSelect } from '@/components/statistics/select-year';
import { Transaction } from '@prisma/client';

import { CategoryPieChart } from './chart-pie-category';
import { TransactionWithRelations } from '@/types/transactions.types';
import { useStatistics } from '@/hooks/use-statistics';
import { PieChart } from 'lucide-react';

export default function StatisticsCategories({
	transactions,
}: {
	transactions: TransactionWithRelations[];
}) {
	const { selectedYear, setSelectedYear, availableYears, yearlyTransactions } =
		useStatistics({
			transactions: transactions,
		});

	return (
		<>
			<div className="flex items-center justify-between gap-4  border-b border-gray-700 pb-3">
				<div className="flex items-center gap-2">
					<PieChart className="size-5" />
					<h3 className="text-lg font-semibold">Categorías</h3>
				</div>
				<div className="flex items-center gap-2">
					<YearSelect
						key={availableYears.join(',')} // Añadimos una key para forzar la re-renderización si cambian los años
						value={selectedYear}
						onChange={setSelectedYear}
						years={availableYears}
					/>
				</div>
			</div>
			<CategoryPieChart transactions={yearlyTransactions} />
		</>
	);
}
