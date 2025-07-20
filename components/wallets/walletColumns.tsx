'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { EditWallet } from './edit-wallet';
import { DeleteWallet } from './delete-wallet';
import { Wallet } from '@prisma/client';

export const columns: ColumnDef<Wallet>[] = [
	{
		accessorKey: 'name',
		meta: {
			label: 'Nombre',
		},
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Nombre
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'initialBalance',
		meta: {
			label: 'Saldo Inicial',
		},
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Saldo Inicial
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('initialBalance'));
			const formatted = new Intl.NumberFormat('es-ES', {
				style: 'currency',
				currency: 'EUR',
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'currentBalance',
		meta: {
			label: 'Saldo Actual',
		},
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Saldo Actual
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('currentBalance'));
			const formatted = new Intl.NumberFormat('es-ES', {
				style: 'currency',
				currency: 'EUR',
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},
	{
		id: 'acciones',
		cell: ({ row }) => {
			const wallet = row.original;
			return (
				<div className="flex justify-end">
					<EditWallet wallet={wallet} />
					<DeleteWallet wallet={wallet} />
				</div>
			);
		},
	},
];
