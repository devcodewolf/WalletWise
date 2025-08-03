'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { createTransaction } from '@/actions/transactions';
import { TransactionForm } from './transaction-form';
import { TransactionsFormSchema } from '@/lib/schemas/transactions';

export function AddTransaction() {
	async function handleSubmit(values: TransactionsFormSchema) {
		const result = await createTransaction(values);
		return { success: result.success };
	}

	return (
		<TransactionForm
			mode="create"
			onSubmit={handleSubmit}
			triggerButton={
				<Button className="ml-auto flex cursor-pointer">
					<PlusCircle className="size-4" />
					<p className="leading-0">Nuevo movimiento</p>
				</Button>
			}
			dialogTitle="Nuevo movimiento"
			dialogDescription="Rellena los campos para crear un nuevo movimiento"
			submitButtonText="Crear movimiento"
		/>
	);
}
