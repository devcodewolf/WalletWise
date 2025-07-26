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
	const [selectedYear, setSelectedYear] = useState<string>('Todos');

	// Obtener años únicos de las transacciones
	const availableYears = useMemo(() => {
		const years = new Set<string>();
		initialData.forEach((transaction) => {
			if (transaction.date) {
				const year = new Date(transaction.date).getFullYear().toString();
				years.add(year);
			}
		});
		return ['Todos', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
	}, [initialData]);

	// Update transactions when initialData changes
	useEffect(() => {
		setTransactions(initialData);
	}, [initialData]);

	// Filtrar transacciones por tipo y año
	const filteredTransactions = useMemo(() => {
		return transactions.filter((transaction) => {
			const matchesType =
				filterType === 'Todos' || transaction.type === filterType;

			if (selectedYear === 'Todos') return matchesType;

			if (!transaction.date) return false;

			const transactionYear = new Date(transaction.date)
				.getFullYear()
				.toString();
			return matchesType && transactionYear === selectedYear;
		});
	}, [transactions, filterType, selectedYear]);

	return (
		<Card className="p-6 gap-4 mb-4">
			<CardHeader className="flex-row items-center p-0">
				<div>
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
					<div className="flex items-center gap-4">
						<TransactionTabs value={filterType} onValueChange={setFilterType} />
						<TransactionSelectYear
							value={selectedYear}
							onValueChange={setSelectedYear}
							years={availableYears}
						/>
					</div>
				}
			/>
		</Card>
	);
};
