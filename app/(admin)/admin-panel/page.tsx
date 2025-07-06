import { getTransactions } from '@/actions/transactions';
import { TransactionsDashboard } from '@/components/dashboard/transactions-dashboard';
import type { TransactionWithRelations } from '@/types/transactions.types';
import { AddTransaction } from '@/components/transactions/add-transaction';

export default async function AdminPanel() {
	// Obtener transacciones
	const respTransaction = await getTransactions();

	// Procesar la respuesta de transacciones
	const transactions: TransactionWithRelations[] =
		respTransaction.success && 'data' in respTransaction
			? respTransaction.data
			: [];

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>

			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
				<h2 className="mb-6 text-2xl font-bold">Resúmen</h2>
				<TransactionsDashboard data={transactions} />
			</div>
		</div>
	);
}
