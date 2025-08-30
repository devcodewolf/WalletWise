import { DataTable } from '@/components/ui/data-table';
import { columns } from './walletColumns';
import { getWallets } from '@/actions/wallets';

interface WalletListProps {
	limitShow?: number;
}

export const WalletList = async ({ limitShow }: WalletListProps) => {
	const respWallets = await getWallets();
	const wallets =
		respWallets.success && 'data' in respWallets ? respWallets.data : [];

	return <DataTable columns={columns} data={wallets} limitShow={limitShow} />;
};
