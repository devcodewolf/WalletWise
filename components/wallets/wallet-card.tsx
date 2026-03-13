'use client'

import { Wallet, Transaction } from '@prisma/client'
import { Card } from '@/components/ui/card'
import { EditWallet } from './edit-wallet'
import { TrendingUp, TrendingDown, WalletIcon } from 'lucide-react'
import Image from 'next/image'

type WalletWithTransactions = Wallet & {
	transactions?: Transaction[]
	lastTransaction?: Transaction | null
}

interface WalletCardProps {
	wallet: WalletWithTransactions
}

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
	}).format(amount)
}

export function WalletCard({ wallet }: WalletCardProps) {
	const currentMonthTx = wallet.transactions || []
	const lastTx = wallet.lastTransaction

	const variacionMes = currentMonthTx.reduce((acc, tx) => {
		return acc + (tx.type === 'Ingreso' ? tx.amount : -tx.amount)
	}, 0)

	const isPositiveVar = variacionMes >= 0

	const topBgColor = wallet.color || 'var(--primary)'

	return (
		<Card className='overflow-hidden py-0 gap-2'>
			{/* Top half: Color */}
			<div
				className='p-6 relative text-white'
				style={{ backgroundColor: topBgColor }}>
				{/* Top bar: Icon and Right badge */}
				<div className='flex justify-between items-start mb-3'>
					<div className='size-12 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden shrink-0'>
						{wallet.image ? (
							<div className='relative w-full h-full p-2 bg-white'>
								<Image
									src={`/img/banks/${wallet.image}`}
									alt={wallet.name}
									fill
									className='object-contain p-2'
								/>
							</div>
						) : (
							<WalletIcon className='size-6' />
						)}
					</div>
					<div className='uppercase text-[10px] font-bold tracking-widest bg-white/10 px-2 py-1 rounded'>
						CUENTA
					</div>
				</div>

				<h3 className='font-semibold text-md truncate mr-2'>{wallet.name}</h3>
				<div className='text-2xl font-bold tracking-tight flex items-center justify-between'>
					{formatCurrency(wallet.currentBalance)}
					<EditWallet wallet={wallet} />
				</div>
			</div>

			{/* Bottom half: Dark info */}
			<div className='p-5 space-y-4'>
				{/* Saldos */}
				<div className='grid grid-cols-2 gap-3'>
					<div className='bg-secondary rounded-xl p-3 border border-white/5'>
						<p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1'>
							Saldo Inicial
						</p>
						<p className='font-semibold text-muted-foreground text-sm'>
							{formatCurrency(wallet.initialBalance)}
						</p>
					</div>
					<div className='bg-secondary rounded-xl p-3 border border-white/5'>
						<p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1'>
							Variación Mes
						</p>
						<p
							className={`font-semibold text-sm ${isPositiveVar ? 'text-emerald-400' : 'text-red-400'}`}>
							{isPositiveVar ? '+' : ''}
							{formatCurrency(variacionMes)}
						</p>
					</div>
				</div>

				{/* Último movimiento */}
				<div>
					<p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 ml-1'>
						Último Movimiento
					</p>
					{lastTx ? (
						<div className='bg-secondary rounded-xl p-3 border border-white/5 transition-colors flex items-center gap-3'>
							<div
								className={`size-8 rounded-full flex items-center justify-center shrink-0 ${lastTx.type === 'Ingreso' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
								{lastTx.type === 'Ingreso' ? (
									<TrendingUp size={14} />
								) : (
									<TrendingDown size={14} />
								)}
							</div>
							<div className='flex-1 min-w-0'>
								<p className='text-sm font-semibold text-muted-foreground truncate'>
									{lastTx.description || 'Movimiento'}
								</p>
								<p className='text-[10px] text-gray-500'>
									{new Date(lastTx.date).toLocaleDateString()}
								</p>
							</div>
							<div
								className={`text-sm font-bold whitespace-nowrap ${lastTx.type === 'Ingreso' ? 'text-emerald-400' : 'text-red-400'}`}>
								{lastTx.type === 'Ingreso' ? '+' : '-'}
								{formatCurrency(lastTx.amount)}
							</div>
						</div>
					) : (
						<div className='bg-secondary rounded-xl p-3 py-4 border border-white/5 flex items-center justify-center'>
							<p className='text-xs text-gray-500'>Sin movimientos</p>
						</div>
					)}
				</div>
			</div>
		</Card>
	)
}
