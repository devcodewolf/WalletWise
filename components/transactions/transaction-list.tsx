'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, Wallet } from '@prisma/client';

import type { TransactionWithRelations } from '@/types/transactions.types';

import { DataTable } from '@/components/ui/data-table';
import { AddTransaction } from '@/components/transactions/add-transaction';
import { columns } from '@/components/transactions/transactionColumns';
import { CircleDollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@radix-ui/react-tabs';

type TransactionListProps = {
	data: TransactionWithRelations[];
	categories: Category[];
	wallets: Wallet[];
};

import { TransactionTabs } from "./transaction-tabs";

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

	// Update transactions when initialData changes
	useEffect(() => {
		console.log('UseEffect transaction list');
		setTransactions(initialData);
	}, [initialData]);

	const filteredTransactions =
		filterType === 'Todos'
			? transactions
			: transactions.filter((t) => t.type === filterType);

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
					<TransactionTabs value={filterType} onValueChange={setFilterType} />
				}
			/>
		</Card>
	);
};
