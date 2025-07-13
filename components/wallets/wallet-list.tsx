'use client';

import { useEffect, useState } from 'react';

import { DataTable } from '@/components/ui/data-table';
import { AddWallet } from './add-wallet';
import { columns } from './walletColumns';
import { Wallet as WalletIcon } from 'lucide-react';
import { Wallet } from '@prisma/client';

export const WalletList = ({ data: initialData }: { data: Wallet[] }) => {
	const [wallets, setWallets] = useState<Wallet[]>(initialData);

	// Update wallets when initialData changes
	useEffect(() => {
		console.log('UseEffect wallet list');
		setWallets(initialData);
	}, [initialData]);

	return (
		<div className="space-y-4">
			{/* Header */}
			<header className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-3xl font-bold flex items-center gap-2">
						<WalletIcon className="size-8" />
						Wallets
					</h2>
					<p className="text-gray-400 mt-1">Gestión de wallets</p>
				</div>
				<AddWallet />
			</header>
			<DataTable columns={columns} data={wallets} />
		</div>
	);
};
