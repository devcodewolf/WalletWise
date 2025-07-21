import { TransactionList } from '@/components/transactions/transaction-list';
import { getTransactions } from '@/actions/transactions';
import { getCategories } from '@/actions/categories';
import { getWallets } from '@/actions/wallets';
import type { TransactionWithRelations } from '@/types/transactions.types';
import { WalletList } from '@/components/wallets/wallet-list';
import { CategoryList } from '@/components/categories/category-list';

export default async function TransactionsPage() {
	const respTransaction = await getTransactions();
	const respCategories = await getCategories();
	const respWallets = await getWallets();

	// soluciona problema de typos porque la respuesta puede ser de varios tipos union
	const transactions: TransactionWithRelations[] =
		respTransaction.success && 'data' in respTransaction
			? respTransaction.data
			: [];
	const categories =
		respCategories.success && 'data' in respCategories
			? respCategories.data
			: [];
	const wallets =
		respWallets.success && 'data' in respWallets ? respWallets.data : [];

	return (
		<>
			<TransactionList
				data={transactions}
				categories={categories}
				wallets={wallets}
			/>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<CategoryList data={categories} limitShow={5} />
				<WalletList data={wallets} limitShow={5} />
			</div>
		</>
	);
}
