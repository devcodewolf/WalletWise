import { getWallets } from '@/actions/wallets';
import { WalletList } from '@/components/wallets/wallet-list';
import { Wallet } from '@prisma/client';

export default async function WalletsPage() {
	const response = await getWallets();

	// soluciona problema de typos porque la respuesta puede ser de varios tipos union
	const wallets: Wallet[] =
		response.success && 'data' in response ? response.data : [];

	return <WalletList data={wallets} />;
}
