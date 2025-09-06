'use client';

import { YearSelect } from '@/components/statistics/select-year';

import { CategoryPieChart } from './chart-pie-category';
import { TransactionWithRelations } from '@/types/transactions.types';
import { useStatistics } from '@/hooks/use-statistics';
import { PieChart } from 'lucide-react';
import { Separator } from '../ui/separator';
import { MonthSelect } from './select-month';

export default function StatisticsCategories({
	transactions,
}: {
	transactions: TransactionWithRelations[];
}) {
	const {
		selectedYear,
		setSelectedYear,
		availableYears,
		selectedMonth,
		setSelectedMonth,
		monthlyTransactions,
		months,
	} = useStatistics({
		transactions: transactions,
	});

	return (
		<>
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<PieChart className="size-5" />
					<Separator
						orientation="vertical"
						className="data-[orientation=vertical]:h-6"
					/>
					<h3 className="text-lg font-semibold">Categorías</h3>
				</div>
				<div className="flex items-center gap-2">
					<MonthSelect
						value={selectedMonth}
						onChange={setSelectedMonth}
						months={months}
					/>
					<YearSelect
						key={availableYears.join(',')} // Añadimos una key para forzar la re-renderización si cambian los años
						value={selectedYear}
						onChange={setSelectedYear}
						years={availableYears}
					/>
				</div>
			</div>
			<Separator />
			<CategoryPieChart transactions={monthlyTransactions} />
		</>
	);
}
