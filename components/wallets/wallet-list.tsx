'use client';

import { useEffect, useState } from 'react';

import { DataTable } from '@/components/ui/data-table';
import { AddWallet } from './add-wallet';
import { columns } from './walletColumns';
import { Wallet as WalletIcon } from 'lucide-react';
import { Wallet } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export const WalletList = ({ data: initialData }: { data: Wallet[] }) => {
	const [wallets, setWallets] = useState<Wallet[]>(initialData);

	// Update wallets when initialData changes
	useEffect(() => {
		console.log('UseEffect wallet list');
		setWallets(initialData);
	}, [initialData]);

	return (
		<Card className="p-6 gap-4">
			<CardHeader className="flex-row items-center p-0">
				<div>
					<h2 className="text-2xl font-bold flex items-center gap-2">
						<WalletIcon className="size-6" />
						<Separator
							orientation="vertical"
							className="data-[orientation=vertical]:h-6"
						/>
						Billeteras
					</h2>
					<p className="text-gray-400 mt-1">Gestión de wallets</p>
				</div>
				<AddWallet />
			</CardHeader>
			<Separator />
			<CardContent className="p-0">
				<DataTable columns={columns} data={wallets} />
			</CardContent>
		</Card>
	);
};
