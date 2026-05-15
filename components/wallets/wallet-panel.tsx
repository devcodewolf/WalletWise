import { getWallets } from '@/actions/wallets'
import { WalletCard } from './wallet-card'

import { Card } from '@/components/ui/card'
import { DollarSign, TrendingUp, WalletIcon } from 'lucide-react'
import { AddWalletCard } from './add-wallet-card'

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
	}).format(amount)
}

export async function WalletPanel() {
	const respWallets = await getWallets()
	const wallets =
		respWallets.success && 'data' in respWallets ? respWallets.data : []

	const totalBalances = wallets.reduce((acc, w) => acc + w.currentBalance, 0)
	const activeWalletsCount = wallets.length

	// Calculate current monthly growth overall
	const totalMonthlyGrowth = wallets.reduce((acc, w) => {
		const currentMonthTx = w.transactions || []
		const varMes = currentMonthTx.reduce(
			(accTx, tx) => accTx + (tx.type === 'Ingreso' ? tx.amount : -tx.amount),
			0,
		)
		return acc + varMes
	}, 0)

	const isGrowthPositive = totalMonthlyGrowth >= 0

	return (
		<div className='space-y-4'>
			{/* Top Summary Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
				<Card className='flex flex-row items-center gap-4 p-5'>
					<div className='size-12 rounded-xl bg-blue-500/20 flex flex-col items-center justify-center text-blue-400'>
						<DollarSign size={24} />
					</div>
					<div className='flex flex-col'>
						<p className='text-[10px] font-semibold text-muted-foreground uppercase'>
							Total Balances
						</p>
						<p className='text-lg font-bold'>{formatCurrency(totalBalances)}</p>
					</div>
				</Card>

				<Card className='flex flex-row items-center gap-4 p-5'>
					<div
						className={`size-12 rounded-xl flex flex-col items-center justify-center ${isGrowthPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
						<TrendingUp size={24} />
					</div>
					<div className='flex flex-col'>
						<p className='text-[10px] font-semibold text-muted-foreground uppercase'>
							Crecimiento Mensual
						</p>
						<p
							className={`text-lg font-bold ${isGrowthPositive ? 'text-emerald-400' : 'text-red-400'}`}>
							{isGrowthPositive ? '+' : ''}
							{formatCurrency(totalMonthlyGrowth)}
						</p>
					</div>
				</Card>

				<Card className='flex flex-row items-center gap-4 p-5'>
					<div className='size-12 rounded-xl bg-indigo-500/20 flex flex-col items-center justify-center text-indigo-400'>
						<WalletIcon size={24} />
					</div>
					<div className='flex flex-col'>
						<p className='text-[10px] font-semibold text-muted-foreground uppercase'>
							Wallets Activas
						</p>
						<p className='text-lg font-bold'>{activeWalletsCount} Cuentas</p>
					</div>
				</Card>
			</div>

			{/* Grid of Wallet Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
				{wallets.map((wallet) => (
					<WalletCard key={wallet.id} wallet={wallet} /> // Tipado forzado por ahora debido a ts
				))}

				{/* The dashed add-wallet card logic */}
				<AddWalletCard />
			</div>
		</div>
	)
}
