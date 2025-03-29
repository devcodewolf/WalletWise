'use client';

import { useEffect, useState } from 'react';
import { Wallet } from '@prisma/client';
import { DataTable } from '@/components/ui/data-table';
import { AddWallet } from './add-wallet';
import { columns } from './walletColumns';

export const WalletList = ({ data: initialData }: { data: Wallet[] }) => {
	const [wallets, setWallets] = useState<Wallet[]>(initialData);

	// Update wallets when initialData changes
	useEffect(() => {
		console.log('UseEffect wallet list');
		setWallets(initialData);
	}, [initialData]);

	return (
		<div className="space-y-4">
			<AddWallet />
			<DataTable columns={columns} data={wallets} />
		</div>
	);
};
