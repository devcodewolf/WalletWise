'use client';

import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';

type Expense = {
	id: string;
	date: string;
	type: string;
	amount: number;
	wallet: string;
	category: string;
};

const columns: ColumnDef<Expense>[] = [
	{
		accessorKey: 'date',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Amount
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'wallet',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Wallet
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Category
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<Button variant="ghost" size="sm">
					<Edit className="h-4 w-4" />
				</Button>
			);
		},
	},
];

const data: Expense[] = [
	{
		id: '1',
		date: '2023-05-01',
		type: 'Expense',
		amount: 50.0,
		wallet: 'Cash',
		category: 'Food',
	},
	{
		id: '2',
		date: '2023-05-02',
		type: 'Income',
		amount: 1000.0,
		wallet: 'Bank',
		category: 'Salary',
	},
	{
		id: '3',
		date: '2023-05-03',
		type: 'Expense',
		amount: 30.5,
		wallet: 'Credit Card',
		category: 'Transportation',
	},
	{
		id: '4',
		date: '2023-05-04',
		type: 'Expense',
		amount: 100.0,
		wallet: 'Cash',
		category: 'Entertainment',
	},
	{
		id: '5',
		date: '2023-05-05',
		type: 'Expense',
		amount: 200.0,
		wallet: 'Bank',
		category: 'Utilities',
	},
	{
		id: '6',
		date: '2023-05-06',
		type: 'Income',
		amount: 500.0,
		wallet: 'Bank',
		category: 'Freelance',
	},
	{
		id: '7',
		date: '2023-05-07',
		type: 'Expense',
		amount: 75.0,
		wallet: 'Credit Card',
		category: 'Shopping',
	},
	{
		id: '8',
		date: '2023-05-08',
		type: 'Expense',
		amount: 40.0,
		wallet: 'Cash',
		category: 'Food',
	},
	{
		id: '9',
		date: '2023-05-09',
		type: 'Expense',
		amount: 150.0,
		wallet: 'Bank',
		category: 'Healthcare',
	},
	{
		id: '10',
		date: '2023-05-10',
		type: 'Expense',
		amount: 60.0,
		wallet: 'Credit Card',
		category: 'Transportation',
	},
];

export const ListExpenses = () => {
	return <DataTable columns={columns} data={data} />;
};
