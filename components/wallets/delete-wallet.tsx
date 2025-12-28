'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Wallet } from '@prisma/client'
import { deleteWallet } from '@/actions/wallets'
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog'

interface DeleteWalletProps {
	wallet: Wallet
}

export function DeleteWallet({ wallet }: DeleteWalletProps) {
	const handleDelete = async () => {
		const result = await deleteWallet(wallet.id)
		return {
			success: result.success,
			error: result.success
				? undefined
				: (result as { error?: string }).error || 'Error al eliminar',
		}
	}

	return (
		<DeleteConfirmDialog
			trigger={
				<Button variant='ghost' size='sm'>
					<Trash2 className='h-4 w-4 text-red-500' />
				</Button>
			}
			title='¿Estás seguro?'
			description={
				<>
					Esta acción no se puede deshacer. Se eliminará permanentemente la
					cartera <strong>{wallet.name}</strong> y todos sus datos asociados.
				</>
			}
			onDelete={handleDelete}
			successMessage={`Cartera "${wallet.name}" eliminada`}
		/>
	)
}
