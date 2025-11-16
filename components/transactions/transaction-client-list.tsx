'use client';

import { useMemo, useState, useEffect } from 'react';
import type { TransactionWithRelations } from '@/types/transactions.types';
import { Category, Wallet } from '@prisma/client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/transactions/transactionColumns';
import { TransactionSelectYear } from './transaction-select-year';
import { TransactionSelectMonth } from './transaction-select-month';
import { monthNames } from '@/lib/utils';
import { TransactionTabs } from './transaction-tabs';

interface TransactionClientListProps {
	initialTransactions: TransactionWithRelations[];
	categories: Category[];
	wallets: Wallet[];
}

export const TransactionClientList = ({
	initialTransactions,
	categories,
	wallets,
}: TransactionClientListProps) => {
	const [filterType, setFilterType] = useState<'Todos' | 'Gasto' | 'Ingreso'>(
		'Todos'
	);
	const [selectedYear, setSelectedYear] = useState<string>('Años');
	const [selectedMonth, setSelectedMonth] = useState<string>('Meses');

	// Obtener años únicos de las transacciones
	const availableYears = useMemo(() => {
		const years = new Set<string>();
		initialTransactions.forEach((transaction) => {
			if (transaction.date) {
				const year = new Date(transaction.date).getFullYear().toString();
				years.add(year);
			}
		});
		return ['Años', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
	}, [initialTransactions]);

	// Obtener meses únicos para el año seleccionado
	const availableMonths = useMemo(() => {
		if (selectedYear === 'Años') {
			return [{ value: 'Meses', label: 'Meses' }];
		}

		const months = new Set<number>();
		initialTransactions.forEach((transaction) => {
			if (transaction.date) {
				const date = new Date(transaction.date);
				if (date.getFullYear().toString() === selectedYear) {
					months.add(date.getMonth());
				}
			}
		});

		const sortedMonths = Array.from(months).sort((a, b) => a - b);

		const monthOptions = sortedMonths.map((monthIndex) => ({
			value: (monthIndex + 1).toString(),
			label: monthNames[monthIndex],
		}));

		return [{ value: 'Meses', label: 'Meses' }, ...monthOptions];
	}, [selectedYear, initialTransactions]);

	// Resetear el mes al cambiar de año
	useEffect(() => {
		setSelectedMonth('Meses');
	}, [selectedYear]);

	// Filtrar transacciones por tipo, año y mes
	const filteredTransactions = useMemo(() => {
		let filtered = [...initialTransactions];

		if (filterType !== 'Todos') {
			filtered = filtered.filter((t) => t.type === filterType);
		}

		if (selectedYear !== 'Años') {
			filtered = filtered.filter(
				(t) =>
					t.date && new Date(t.date).getFullYear().toString() === selectedYear
			);
			if (selectedMonth !== 'Meses') {
				filtered = filtered.filter(
					(t) =>
						t.date &&
						(new Date(t.date).getMonth() + 1).toString() === selectedMonth
				);
			}
		}

		return filtered;
	}, [initialTransactions, filterType, selectedYear, selectedMonth]);

	return (
		<DataTable
			columns={columns({ wallets, categories })}
			data={filteredTransactions}
			initialColumnVisibility={{ type: false }}
			toolbar={
				<div className="flex items-center flex-wrap gap-4">
					<TransactionTabs value={filterType} onValueChange={setFilterType} />
					<TransactionSelectYear
						value={selectedYear}
						onValueChange={setSelectedYear}
						years={availableYears}
					/>
					<TransactionSelectMonth
						value={selectedMonth}
						onValueChange={setSelectedMonth}
						months={availableMonths}
					/>
				</div>
			}
		/>
	);
};
