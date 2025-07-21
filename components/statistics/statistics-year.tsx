'use client';

import { YearSelect } from '@/components/statistics/select-year';
import { Transaction } from '@prisma/client';
import { useStatistics } from '@/hooks/use-statistics';
import { YearlyChart } from './chart-yearly';
import { Calendar } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function StatisticsYear({
	transactions,
}: {
	transactions: Transaction[];
}) {
	const { selectedYear, setSelectedYear, availableYears, yearlyTransactions } =
		useStatistics({
			transactions: transactions,
		});

	return (
		<>
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<Calendar className="size-5" />
					<Separator
						orientation="vertical"
						className="data-[orientation=vertical]:h-6"
					/>
					<h3 className="text-lg font-semibold">Anual</h3>
				</div>
				<YearSelect
					value={selectedYear}
					onChange={setSelectedYear}
					years={availableYears}
				/>
			</div>
			<Separator />
			<YearlyChart transactions={yearlyTransactions} />
		</>
	);
}
