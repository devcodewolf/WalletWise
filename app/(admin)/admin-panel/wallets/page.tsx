import { getWallets } from '@/actions/wallets';
import { WalletList } from '@/components/wallets/wallet-list';
import { Wallet } from '@prisma/client';

// Forzar el renderizado dinámico de la página
export const dynamic = 'force-dynamic';

export default async function WalletsPage() {
	const response = await getWallets();

	// soluciona problema de typos porque la respuesta puede ser de varios tipos union
	const wallets: Wallet[] =
		response.success && 'data' in response ? response.data : [];

	return <WalletList data={wallets} />;
}
