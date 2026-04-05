'use client'

import { Plus } from 'lucide-react'
import { WalletForm } from './wallet-form'
import { createWallet } from '@/actions/wallets'
import { WalletsFormSchema } from '@/lib/schemas/wallets'

export function AddWalletCard() {
	async function onSubmit(values: WalletsFormSchema) {
		const result = await createWallet(values) // Type assertion para evitar error temporal de prisma
		return { success: !!result.success }
	}

	return (
		<WalletForm
			mode='create'
			onSubmit={onSubmit}
			triggerButton={
				<button className='group h-full min-h-[380px] w-full flex flex-col items-center justify-center p-6 border-2 border-dashed dark:border-white/10 border-black/10 rounded-2xl bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-all'>
					<div className='size-16 rounded-full bg-[#1e2025] flex items-center justify-center group-hover:scale-110 transition-all mb-4 border border-white/5 text-muted-foreground group-hover:text-white shadow-xl'>
						<Plus size={28} />
					</div>
					<h3 className='font-medium text-muted-foreground group-hover:text-black group-hover:dark:text-white transition-colors tracking-wide'>
						Añadir Nueva Cartera
					</h3>
				</button>
			}
			dialogTitle='Añadir Cartera'
			dialogDescription='Añade una nueva cuenta para gestionar sus ingresos y gastos.'
			submitButtonText='Crear Cartera'
		/>
	)
}
