'use client';

import { YearSelect } from '@/components/statistics/select-year';
import { Transaction } from '@prisma/client';
import { useStatistics } from '@/hooks/use-statistics';
import { SummaryMonthly } from './summary-monthly';
import { CalendarDays, CalendarRange } from 'lucide-react';
import { QuarterlySummary } from './summary-quarterly';
import { AnnualBalance } from './annual-balance';

export default function StatisticsSumary({
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
			<div className="mb-4 ml-auto">
				<YearSelect
					value={selectedYear}
					onChange={setSelectedYear}
					years={availableYears}
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2">
				<div className="border-r border-gray-700 pr-8">
					<div className="flex items-center gap-2">
						<CalendarRange className="size-5" />
						<h3 className="text-xl font-semibold leading-none flex items-center gap-2">
							Resumen Mensual
						</h3>
					</div>
					<p className="text-sm text-gray-400 mt-1">
						Desglose por meses año {selectedYear}
					</p>
					<SummaryMonthly transactions={yearlyTransactions} />
				</div>
				<div className="pl-8">
					<div className="flex items-center gap-2">
						<CalendarDays className="size-5" />
						<h3 className="text-xl font-semibold leading-none flex items-center gap-2">
							Resumen Trimestral
						</h3>
					</div>
					<p className="text-sm text-gray-400 mt-1">Año {selectedYear}</p>
					<QuarterlySummary transactions={yearlyTransactions} />
				</div>
			</div>
		</>
	);
}
