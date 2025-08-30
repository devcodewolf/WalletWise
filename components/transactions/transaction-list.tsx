// actions
import { getTransactions } from '@/actions/transactions';
import { getCategories } from '@/actions/categories';
import { getWallets } from '@/actions/wallets';
import { TransactionClientList } from './transaction-client-list';

export const TransactionList = async () => {
	const [transRes, catRes, walRes] = await Promise.all([
		getTransactions(),
		getCategories(),
		getWallets(),
	]);

	const transactions =
		transRes.success && 'data' in transRes ? transRes.data : [];
	const categories = catRes.success && 'data' in catRes ? catRes.data : [];
	const wallets = walRes.success && 'data' in walRes ? walRes.data : [];

	return (
		<TransactionClientList
			initialTransactions={transactions}
			categories={categories}
			wallets={wallets}
		/>
	);
};
