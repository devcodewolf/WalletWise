'use client';

import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Category, Wallet } from '@prisma/client';
import { updateTransaction } from '@/actions/transactions';
import { TransactionWithRelations } from '@/types/transactions.types';
import { TransactionForm } from './transaction-form';
import { TransactionsFormSchema } from '@/lib/schemas/transactions';

type EditTransactionProps = {
	transaction: TransactionWithRelations;
	wallets: Wallet[];
	categories: Category[];
};

export function EditTransaction({
	transaction,
	wallets,
	categories,
}: EditTransactionProps) {
	async function handleSubmit(values: TransactionsFormSchema) {
		const result = await updateTransaction(transaction.id, values);
		return { success: result.success };
	}

	return (
		<TransactionForm
			mode="edit"
			transaction={transaction}
			preloadedWallets={wallets}
			preloadedCategories={categories}
			onSubmit={handleSubmit}
			triggerButton={
				<Button variant="ghost" size="sm">
					<Edit className="h-4 w-4" />
				</Button>
			}
			dialogTitle="Editar Transacción"
			dialogDescription="Actualiza los detalles de la transacción"
			submitButtonText="Actualizar"
		/>
	);
}
