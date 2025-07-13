'use client';

import { useState } from 'react';
import { YearSelect } from './year-select';
import { Transaction } from '@prisma/client';

import { CategoryPieChart } from './pie-chart-category';
import { TransactionWithRelations } from '@/types/transactions.types';

export default function StatisticsCategories({
	transactions,
}: {
	transactions: TransactionWithRelations[];
}) {
	const [selectedYear, setSelectedYear] = useState<string>(
		new Date().getFullYear().toString()
	);

	// Calcular los años disponibles a partir de las transacciones
	const availableYears = Array.from(
		new Set(
			transactions.map((t: Transaction) => {
				const date = t.date instanceof Date ? t.date : new Date(t.date);
				return date.getFullYear();
			})
		)
	)
		.sort((a: number, b: number) => a - b)
		.map(String);

	// Filtrar transacciones del año seleccionado
	const yearlyTransactions = transactions.filter(
		(t) => t.date.getFullYear() === Number(selectedYear)
	);

	return (
		<div>
			<div className="flex items-center gap-2 mb-4">
				<YearSelect
					value={selectedYear}
					onChange={setSelectedYear}
					years={availableYears}
				/>
			</div>
			<CategoryPieChart transactions={yearlyTransactions} />
		</div>
	);
}
