import { WalletIcon } from 'lucide-react';
import { CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AddWallet } from '@/components/wallets/add-wallet';

export default function HeaderWallet() {
	return (
		<CardHeader className="block md:flex md:flex-row items-center p-0">
			<div className="mb-3 md:mb-0">
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
	);
}
