'use client';

import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Wallet } from '@prisma/client';
import { updateWallet } from '@/actions/wallets';
import { WalletForm } from './wallet-form';
import { WalletsFormSchema } from '@/lib/schemas/wallets';

interface EditWalletProps {
	wallet: Wallet;
}

export function EditWallet({ wallet }: EditWalletProps) {
	const handleSubmit = async (values: WalletsFormSchema) => {
		const result = await updateWallet(wallet.id, values);
		return { success: !!result.success };
	};

	return (
		<WalletForm
			mode="edit"
			wallet={wallet}
			onSubmit={handleSubmit}
			triggerButton={
				<Button variant="ghost" size="sm">
					<Edit className="h-4 w-4" />
				</Button>
			}
			dialogTitle="Editar Cartera"
			dialogDescription="Modifica los detalles de tu cartera aquí."
			submitButtonText="Guardar Cambios"
		/>
	);
}
