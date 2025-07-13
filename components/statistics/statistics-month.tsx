'use client';

import { useState } from 'react';
import { MonthSelect } from './month-select';
import { YearSelect } from './year-select';
import { MonthlyChart } from './chart-monthly';
import { Transaction } from '@prisma/client';

const months = [
	{ value: '1', label: 'Enero' },
	{ value: '2', label: 'Febrero' },
	{ value: '3', label: 'Marzo' },
	{ value: '4', label: 'Abril' },
	{ value: '5', label: 'Mayo' },
	{ value: '6', label: 'Junio' },
	{ value: '7', label: 'Julio' },
	{ value: '8', label: 'Agosto' },
	{ value: '9', label: 'Septiembre' },
	{ value: '10', label: 'Octubre' },
	{ value: '11', label: 'Noviembre' },
	{ value: '12', label: 'Diciembre' },
];

export default function StatisticsMonth({
	transactions,
}: {
	transactions: Transaction[];
}) {
	const [selectedMonth, setSelectedMonth] = useState<string>(
		(new Date().getMonth() + 1).toString()
	);
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

	// Filtrar transacciones por mes y año seleccionados
	const filteredTransactions = transactions.filter((t: Transaction) => {
		const date = t.date instanceof Date ? t.date : new Date(t.date);
		return (
			date.getFullYear() === Number(selectedYear) &&
			date.getMonth() + 1 === Number(selectedMonth)
		);
	});

	console.log(filteredTransactions);

	return (
		<div>
			<div className="flex items-center gap-2 mb-4">
				<MonthSelect
					value={selectedMonth}
					onChange={setSelectedMonth}
					months={months}
				/>
				<YearSelect
					value={selectedYear}
					onChange={setSelectedYear}
					years={availableYears}
				/>
			</div>
			<MonthlyChart
				transactions={filteredTransactions}
				selectedMonth={Number.parseInt(selectedMonth)}
				selectedYear={Number.parseInt(selectedYear)}
			/>
		</div>
	);
}
