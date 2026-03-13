import { TableListSkeleton } from '@/components/table-list-skeleton';

import { Separator } from '@/components/ui/separator';
import HeaderWallet from '@/components/wallets/header-wallet';
import { WalletPanel } from '@/components/wallets/wallet-panel';

import { Suspense } from 'react';

// Forzar el renderizado dinámico de la página
// export const dynamic = 'force-dynamic';

export default function WalletsPage() {
	return (
		<>
			<div className="pt-4">
				<HeaderWallet />
			</div>
			<Separator className="mt-4 mb-6" />
			<div className="pt-2">
				<Suspense fallback={<TableListSkeleton />}>
					<WalletPanel />
				</Suspense>
			</div>
		</>
	);
}
