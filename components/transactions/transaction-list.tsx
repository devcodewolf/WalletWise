'use client';

import { useEffect, useState } from 'react';
import { Category, Wallet } from '@prisma/client';

import type { TransactionWithRelations } from '@/types/transactions.types';

import { DataTable } from '@/components/ui/data-table';
import { AddTransaction } from '@/components/transactions/add-transaction';
import { columns } from '@/components/transactions/transactionColumns';
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

	// Update transactions when initialData changes
	useEffect(() => {
		console.log('UseEffect transaction list');
		setTransactions(initialData);
	}, [initialData]);

	return (
		<div className="space-y-4">
			{/* Header */}
			<header className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-3xl font-bold flex items-center gap-2">
						<CircleDollarSign className="size-8" />
						Transacciones
					</h2>
					<p className="text-gray-400 mt-1">Gestión de transacciones</p>
				</div>
				<AddTransaction />
			</header>
			<DataTable
				columns={columns({ wallets, categories })}
				data={transactions}
			/>
		</div>
	);
};
