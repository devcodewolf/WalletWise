'use client';

import { useEffect, useState } from 'react';
import { Category, Wallet } from '@prisma/client';

import type { TransactionWithRelations } from '@/types/transactions.types';

import { DataTable } from '@/components/ui/data-table';
import { AddTransaction } from '@/components/transactions/add-transaction';
import { columns } from '@/components/transactions/transactionColumns';
import { CircleDollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
			<CardContent className="p-0">
				<DataTable
					columns={columns({ wallets, categories })}
					data={transactions}
				/>
			</CardContent>
		</Card>
	);
};
