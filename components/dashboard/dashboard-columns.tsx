'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Transaction } from '@prisma/client';

export const dashboardColumns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'date',
		meta: {
			label: 'Fecha',
		},
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
		meta: {
			label: 'Tipo',
		},
		header: 'Tipo',
	},
	{
		accessorKey: 'amount',
		meta: {
			label: 'Cantidad',
		},
		header: ({ column }) => {
			return (
				<div className="text-right">
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						Cantidad
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('es-ES', {
				style: 'currency',
				currency: 'EUR',
			}).format(amount);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: 'description',
		meta: {
			label: 'Descripción',
		},
		header: 'Descripción',
	},
];
