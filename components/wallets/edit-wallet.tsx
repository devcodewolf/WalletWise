'use client'

import { Edit } from 'lucide-react'
import { Wallet } from '@prisma/client'
import { updateWallet } from '@/actions/wallets'
import { WalletForm } from './wallet-form'
import { WalletsFormSchema } from '@/lib/schemas/wallets'

interface EditWalletProps {
	wallet: Wallet
}

export function EditWallet({ wallet }: EditWalletProps) {
	const handleSubmit = async (values: WalletsFormSchema) => {
		const result = await updateWallet(wallet.id, values)
		return { success: !!result.success }
	}

	return (
		<div>
			<div>
				<WalletForm
					mode='edit'
					wallet={wallet}
					onSubmit={handleSubmit}
					triggerButton={
						<Edit className='size-5 hover:scale-110 mb-0.5 cursor-pointer transition-transform duration-300' />
					}
					dialogTitle='Editar Cartera'
					dialogDescription='Modifica los detalles de tu cartera aquí.'
					submitButtonText='Guardar Cambios'
				/>
			</div>
		</div>
	)
}
