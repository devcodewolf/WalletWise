import { Suspense } from 'react';
import { TransactionList } from '@/components/transactions/transaction-list';
import { TransactionListSkeleton } from '@/components/transactions/transaction-list-skeleton';
import { AddTransaction } from '@/components/transactions/add-transaction';
import { Card, CardHeader } from '@/components/ui/card';

import { CircleDollarSign, Inbox, WalletIcon } from 'lucide-react';
import { CategoryList } from '@/components/categories/category-list';
import { AddCategory } from '@/components/categories/add-category';

import { Separator } from '@/components/ui/separator';
import { TableListSkeleton } from '@/components/table-list-skeleton';
import { WalletList } from '@/components/wallets/wallet-list';
import { AddWallet } from '@/components/wallets/add-wallet';

// Forzar el renderizado dinámico de la página
// export const dynamic = 'force-dynamic';

export default function TransactionsPage() {
	console.log('page TransactionsPage');
	return (
		<>
			<Card className="p-6 gap-4 mb-4">
				<CardHeader className="block md:flex md:flex-row items-center p-0">
					<div className="mb-3 md:mb-0">
						<h2 className="text-2xl font-bold flex items-center gap-2">
							<CircleDollarSign className="size-6" />
							<Separator
								orientation="vertical"
								className="data-[orientation=vertical]:h-6"
							/>
							Movimientos
						</h2>
						<p className="text-gray-400 mt-1">
							Registro de todos los movimientos
						</p>
					</div>
					<AddTransaction />
				</CardHeader>
				<Separator />

				<Suspense fallback={<TransactionListSkeleton />}>
					<TransactionList />
				</Suspense>
			</Card>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<Card className="p-6 gap-4">
					<CardHeader className="block md:flex md:flex-row items-center p-0">
						<div className="mb-3 md:mb-0">
							<h2 className="text-2xl font-bold flex items-center gap-2">
								<Inbox className="size-6" />
								<Separator
									orientation="vertical"
									className="data-[orientation=vertical]:h-6"
								/>
								Categorías
							</h2>
							<p className="text-gray-400 mt-1">Gestión de categorías</p>
						</div>
						<AddCategory />
					</CardHeader>
					<Separator />
					{/* category */}
					<Suspense fallback={<TableListSkeleton />}>
						<CategoryList limitShow={5} />
					</Suspense>
				</Card>
				<Card className="p-6 gap-4">
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
					<Separator />
					{/* category */}
					<Suspense fallback={<TableListSkeleton />}>
						<WalletList limitShow={5} />
					</Suspense>
				</Card>
			</div>
		</>
	);
}
