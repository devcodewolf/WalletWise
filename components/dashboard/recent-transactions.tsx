import type { TransactionWithRelations } from '@/types/transactions.types'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

interface RecentTransactionsProps {
	transactions: TransactionWithRelations[]
}

function formatDate(date: Date | string) {
	const d = date instanceof Date ? date : new Date(date)
	return d.toLocaleDateString('es-ES', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
}

function formatAmount(amount: number) {
	return amount.toLocaleString('es-ES', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
	const recent = [...transactions]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 10)

	const isEmpty = recent.length === 0

	return (
		<div className='flex flex-col h-full gap-3 min-h-0'>
			<h3 className='text-sm font-semibold text-foreground shrink-0'>
				Últimos movimientos
			</h3>

			{isEmpty ? (
				<p className='text-xs text-muted-foreground text-center py-4'>
					Sin movimientos recientes
				</p>
			) : (
				<ul className='flex flex-col gap-1 overflow-y-auto min-h-0 pr-1 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent'>
					{recent.map((t) => {
						const isIncome = t.type === 'Ingreso'
						return (
							<li
								key={t.id}
								className='2xl:flex items-center gap-3 px-2 py-2 border-b hover:bg-muted/80 transition-colors group'>
								{/* Icono tipo */}
								<span
									className={`shrink-0 flex items-center mb-322xl:mb-0 justify-center w-7 h-7 rounded-full transition-transform group-hover:scale-110 ${
										isIncome
											? 'bg-green-500/15 text-green-400'
											: 'bg-red-500/15 text-red-400'
									}`}>
									{isIncome ? (
										<ArrowUpRight size={14} strokeWidth={2.5} />
									) : (
										<ArrowDownLeft size={14} strokeWidth={2.5} />
									)}
								</span>

								{/* Detalles */}
								<div className='flex flex-col min-w-0 flex-1'>
									<span className='text-[11px] text-muted-foreground leading-tight'>
										{formatDate(t.date)}
										{/* {t.category?.name && t.description
											? ` · ${t.category.name}`
											: ''} */}
									</span>
									<span className='text-sm font-medium text-foreground truncate leading-tight'>
										{t.description || t.category?.name || '—'}
									</span>
								</div>

								{/* Monto */}
								<span
									className={`text-sm font-bold shrink-0 tabular-nums ${
										isIncome ? 'text-green-500' : 'text-red-400'
									}`}>
									{isIncome ? '+' : '-'} €{formatAmount(t.amount)}
								</span>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
