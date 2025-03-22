'use client';

import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ArrowUpDown, Wallet as WalletIcon } from 'lucide-react';
import { useState } from 'react';
import { AddWallet } from './add-wallet';

type Wallet = {
	id: string;
	name: string;
	initialBalance: number;
};

const columns: ColumnDef<Wallet>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'initialBalance',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Initial Balance
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('initialBalance'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<div className="flex justify-end">
					<Button variant="ghost" size="sm">
						<Edit className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="sm">
						<Trash2 className="h-4 w-4 text-red-500" />
					</Button>
				</div>
			);
		},
	},
];

export const WalletList = ({ data: initialData }: { data: Wallet[] }) => {
	const [wallets, setWallets] = useState<Wallet[]>(initialData);

	const handleAddWallet = (newWallet: Omit<Wallet, 'id'>) => {
		const id = (wallets.length + 1).toString();
		const walletWithId = { ...newWallet, id };
		setWallets([...wallets, walletWithId]);
	};

	return (
		<div className="space-y-4">
			<AddWallet onAddWallet={handleAddWallet} />
			<DataTable columns={columns} data={wallets} />
		</div>
	);
};
