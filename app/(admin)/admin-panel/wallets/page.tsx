import { TableListSkeleton } from '@/components/table-list-skeleton';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import HeaderWallet from '@/components/wallets/header-wallet';
import { WalletList } from '@/components/wallets/wallet-list';

import { Suspense } from 'react';

// Forzar el renderizado dinámico de la página
// export const dynamic = 'force-dynamic';

export default function WalletsPage() {
	return (
		<Card className="p-6 gap-4">
			<HeaderWallet />
			<Separator />
			{/* category */}
			<Suspense fallback={<TableListSkeleton />}>
				<WalletList />
			</Suspense>
		</Card>
	);
}
