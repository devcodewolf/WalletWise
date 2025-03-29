import { getWallets } from '@/actions/wallets';
import { WalletList } from '@/components/wallets/wallet-list';
import { Wallet } from '@prisma/client';

export default async function WalletsPage() {
	const response = await getWallets();

	// soluciona problema de typos porque la respuesta puede ser de varios tipos union
	const wallets: Wallet[] =
		response.success && 'data' in response ? response.data : [];

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
				<WalletList data={wallets} />
			</div>
		</div>
	);
}
