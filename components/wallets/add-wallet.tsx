'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WalletsFormSchema } from '@/lib/schemas/wallets';
import { createWallet } from '@/actions/wallets';
import { WalletForm } from './wallet-form';

export function AddWallet() {
	async function onSubmit(values: WalletsFormSchema) {
		const result = await createWallet(values);
		return { success: !!result.success };
	}

	return (
		<WalletForm
			mode="create"
			onSubmit={onSubmit}
			triggerButton={
				<Button size="sm">
					<Plus className="mr-2 h-4 w-4" />
					Añadir Cartera
				</Button>
			}
			dialogTitle="Añadir Cartera"
			dialogDescription="Añade una nueva cartera para gestionar tus finanzas."
			submitButtonText="Crear Cartera"
		/>
	);
}
