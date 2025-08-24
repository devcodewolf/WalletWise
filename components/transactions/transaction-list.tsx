'use client';

import { useEffect, useMemo, useState } from 'react';
import { Category, Wallet } from '@prisma/client';

import type { TransactionWithRelations } from '@/types/transactions.types';

import { DataTable } from '@/components/ui/data-table';
import { AddTransaction } from '@/components/transactions/add-transaction';
import { columns } from '@/components/transactions/transactionColumns';
import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TransactionTabs } from './transaction-tabs';
import { TransactionSelectYear } from './transaction-select-year';

import { CircleDollarSign } from 'lucide-react';
import { TransactionSelectMonth } from './transaction-select-month';
import { monthNames } from '@/lib/utils';

type TransactionListProps = {
	data: TransactionWithRelations[];
	categories: Category[];
	wallets: Wallet[];
};

export const TransactionList = ({
	data: initialData,
	categories,
	wallets,
}: TransactionListProps) => {
	const [transactions, setTransactions] =
		useState<TransactionWithRelations[]>(initialData);
	const [filterType, setFilterType] = useState<'Todos' | 'Gasto' | 'Ingreso'>(
		'Todos'
	);
	const [selectedYear, setSelectedYear] = useState<string>('Años');
	const [selectedMonth, setSelectedMonth] = useState<string>('Meses');

	// Obtener años únicos de las transacciones
	const availableYears = useMemo(() => {
		const years = new Set<string>();
		initialData.forEach((transaction) => {
			if (transaction.date) {
				const year = new Date(transaction.date).getFullYear().toString();
				years.add(year);
			}
		});
		return ['Años', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
	}, [initialData]);

	// Obtener meses únicos para el año seleccionado
	const availableMonths = useMemo(() => {
		if (selectedYear === 'Años') {
			return [{ value: 'Meses', label: 'Meses' }];
		}

		const months = new Set<number>();
		initialData.forEach((transaction) => {
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
	}, [selectedYear, initialData]);

	// Update transactions when initialData changes
	useEffect(() => {
		setTransactions(initialData);
	}, [initialData]);

	// Resetear el mes al cambiar de año
	useEffect(() => {
		setSelectedMonth('Meses');
	}, [selectedYear]);

	// Filtrar transacciones por tipo, año y mes
	const filteredTransactions = useMemo(() => {
		let filtered = [...transactions];

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
	}, [transactions, filterType, selectedYear, selectedMonth]);

	return (
		<Card className="p-6 gap-4 mb-4">
			<CardHeader className="block md:flex md:flex-row items-center p-0">
				<div className="mb-3 md:mb-0">
					<h2 className="text-2xl font-bold flex items-center gap-2">
						<CircleDollarSign className="size-6" />
						<Separator
							orientation="vertical"
							className="data-[orientation=vertical]:h-6"
						/>
						Transacciones
					</h2>
					<p className="text-gray-400 mt-1">Gestión de transacciones</p>
				</div>
				<AddTransaction />
			</CardHeader>
			<Separator />

			<DataTable
				columns={columns({ wallets, categories })}
				data={filteredTransactions}
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
		</Card>
	);
};
