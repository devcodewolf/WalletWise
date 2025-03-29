import { TransactionList } from '@/components/transactions/transaction-list';
import { getTransactions } from '@/actions/transactions';
import { getCategories } from '@/actions/categories';
import { getWallets } from '@/actions/wallets';
import type { TransactionWithRelations } from '@/types/transactions.types';

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
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
				<TransactionList
					data={transactions}
					categories={categories}
					wallets={wallets}
				/>
			</div>
		</div>
	);
}
