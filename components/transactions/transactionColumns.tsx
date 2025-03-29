'use client';

import { Category, Wallet } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditTransaction } from '@/components/transactions/edit-transaction';
import { DeleteTransaction } from '@/components/transactions/delete-transaction';
import { TransactionWithRelations } from '@/types/transactions.types';

type ColumnsProps = {
	wallets: Wallet[];
	categories: Category[];
};

export const columns = ({
	wallets,
	categories,
}: ColumnsProps): ColumnDef<TransactionWithRelations>[] => [
	{
		accessorKey: 'date',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Fecha
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date = new Date(row.getValue('date'));
			return <div>{date.toLocaleDateString('es-ES')}</div>;
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Tipo
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const type = row.getValue('type');
			return <div>{type === 'Gasto' ? 'Gasto' : 'Ingreso'}</div>;
		},
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Monto
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('es-ES', {
				style: 'currency',
				currency: 'EUR',
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'description',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Descripción
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'wallet.name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Cartera
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const wallet = row.original.wallet;
			return <div>{wallet?.name || 'Sin cartera'}</div>;
		},
	},
	{
		accessorKey: 'category.name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Categoría
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const category = row.original.category;
			return <div>{category?.name || 'Sin categoría'}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const transaction = row.original;

			return (
				<div className="flex justify-end">
					<EditTransaction
						transaction={transaction}
						wallets={wallets}
						categories={categories}
					/>
					<DeleteTransaction transaction={transaction} />
				</div>
			);
		},
	},
];
