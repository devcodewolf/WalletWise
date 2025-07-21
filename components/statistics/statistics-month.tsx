'use client';

import { MonthSelect } from '@/components/statistics/select-month';
import { YearSelect } from '@/components/statistics/select-year';
import { MonthlyChart } from '@/components/statistics/chart-monthly';
import { Transaction } from '@prisma/client';
import { useStatistics } from '@/hooks/use-statistics';
import { TrendingUp } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function StatisticsMonth({
	transactions,
}: {
	transactions: Transaction[];
}) {
	const {
		selectedYear,
		setSelectedYear,
		availableYears,
		selectedMonth,
		setSelectedMonth,
		months,
		monthlyTransactions,
	} = useStatistics({
		transactions,
	});

	return (
		<>
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<TrendingUp className="size-5" />
					<Separator
						orientation="vertical"
						className="data-[orientation=vertical]:h-6"
					/>

					<h3 className="text-lg font-semibold">Mensual</h3>
				</div>
				<div className="flex items-center gap-2">
					<MonthSelect
						value={selectedMonth}
						onChange={setSelectedMonth}
						months={months}
					/>
					<YearSelect
						key={availableYears.join(',')}
						value={selectedYear}
						onChange={setSelectedYear}
						years={availableYears}
					/>
				</div>
			</div>
			<Separator />
			<MonthlyChart
				transactions={monthlyTransactions}
				selectedMonth={Number.parseInt(selectedMonth)}
				selectedYear={Number.parseInt(selectedYear)}
			/>
		</>
	);
}
