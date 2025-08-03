'use client';

import { createWallet } from '@/actions/wallets';
import { Button } from '@/components/ui/button';
import { WalletsFormSchema } from '@/lib/schemas/wallets';
import { PlusCircle } from 'lucide-react';
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
				<Button>
					<PlusCircle className="size-4" />
					<p className="leading-0">Nueva cartera</p>
				</Button>
			}
			dialogTitle="Añadir Cartera"
			dialogDescription="Añade una nueva cartera para gestionar tus finanzas."
			submitButtonText="Crear Cartera"
		/>
	);
}
