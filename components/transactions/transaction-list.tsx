'use client';

import { useEffect, useState } from 'react';
import { Category, Wallet } from '@prisma/client';

import type { TransactionWithRelations } from '@/types/transactions.types';

import { DataTable } from '@/components/ui/data-table';
import { AddTransaction } from '@/components/transactions/add-transaction';
import { columns } from '@/components/transactions/transactionColumns';

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
			<AddTransaction />
			{/* <AddTransaction wallets={wallets} categories={categories} /> */}
			<DataTable
				columns={columns({ wallets, categories })}
				data={transactions}
			/>
		</div>
	);
};
