'use client'

import { Transaction } from '@prisma/client'
import { monthNames } from '@/lib/utils'
import { ChartLine, Euro, Minus } from 'lucide-react'

interface SummaryMonthlyProps {
	transactions: Transaction[]
}

function formatAmount(amount: number, prefix = '') {
	return `${prefix}${new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(Math.abs(amount))}`
}

export function SummaryMonthly({ transactions }: SummaryMonthlyProps) {
	const monthlyData = Array.from({ length: 12 }, (_, i) => {
		const month = i + 1
		const monthTransactions = transactions.filter(
			(t) => t.date.getMonth() + 1 === month,
		)

		const totalExpenses = monthTransactions
			.filter((t) => t.type === 'Gasto')
			.reduce((sum, t) => sum + t.amount, 0)
		const totalIncome = monthTransactions
			.filter((t) => t.type === 'Ingreso')
			.reduce((sum, t) => sum + t.amount, 0)
		const balance = totalIncome - totalExpenses

		return {
			month: monthNames[i],
			expenses: totalExpenses,
			income: totalIncome,
			balance,
			hasData: totalExpenses > 0 || totalIncome > 0,
		}
	}).filter((data) => data.hasData)

	return (
		<div className='max-h-[420px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent'>
			{monthlyData.length === 0 ? (
				<div className='text-center text-muted-foreground py-10 text-sm'>
					No hay datos para este año
				</div>
			) : (
				monthlyData.map((data) => (
					<div
						key={data.month}
						className='rounded-xl border border-border bg-muted/30 px-4 py-3 hover:bg-muted/50 transition-colors'>
						{/* Nombre del mes */}
						<p className='text-sm font-semibold mb-1.5 text-foreground'>
							{data.month}
						</p>

						{/* Fila de métricas */}
						<div className='grid grid-cols-3 gap-2'>
							{/* Ingresos */}
							<div className='flex  items-center gap-1.5'>
								<div className='size-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center'>
									{/* Icono $ en verde */}
									<Euro className='size-4 text-emerald-400' />
								</div>
								<div>
									<p className='text-xs text-muted-foreground font-medium'>
										Ingresos
									</p>
									<p className='text-sm font-semibold text-emerald-400'>
										+{formatAmount(data.income)}
									</p>
								</div>
							</div>

							{/* Gastos */}
							<div className='flex items-center gap-1.5'>
								<div className='size-8 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center'>
									{/* Icono — en rojo */}
									<Minus className='size-4 text-red-400' />
								</div>
								<div>
									<p className='text-xs text-muted-foreground font-medium'>
										Gastos
									</p>
									<p className='text-sm font-semibold text-red-400'>
										-{formatAmount(data.expenses)}
									</p>
								</div>
							</div>

							{/* Balance */}
							<div className='flex items-center gap-1.5'>
								<div
									className={`size-8 rounded-md flex items-center justify-center ${
										data.balance >= 0
											? 'bg-blue-500/15 border border-blue-500/30'
											: 'bg-orange-500/15 border border-orange-500/30'
									}`}>
									{/* Icono flecha */}
									<ChartLine
										className={`size-3.5 ${data.balance >= 0 ? 'text-blue-400' : 'text-orange-400'}`}
									/>
								</div>
								<div>
									<p className='text-xs text-muted-foreground font-medium'>
										Balance
									</p>
									<p
										className={`text-sm font-semibold ${
											data.balance >= 0 ? 'text-blue-400' : 'text-orange-400'
										}`}>
										{data.balance >= 0 ? '+' : '-'}
										{formatAmount(data.balance)}
									</p>
								</div>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	)
}
