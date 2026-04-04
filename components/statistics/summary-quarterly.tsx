'use client'

import { Transaction } from '@prisma/client'
import { TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface QuarterlySummaryProps {
	transactions: Transaction[]
	selectedYear: string | number
}

const QUARTER_COLORS = [
	'bg-indigo-300 text-indigo-600',
	'bg-violet-300 text-violet-600',
	'bg-purple-300 text-purple-600',
	'bg-fuchsia-300 text-fuchsia-600',
]

function formatAmount(amount: number) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount)
}

export function QuarterlySummary({
	transactions,
	selectedYear,
}: QuarterlySummaryProps) {
	const today = new Date()
	const currentYear = today.getFullYear()
	const currentMonth = today.getMonth() + 1
	// Solo marcamos EN CURSO si el año visible es el año real
	const isCurrentYear = Number(selectedYear) === currentYear

	const quarters = [
		{ name: 'Q1', months: [1, 2, 3], label: 'Ene - Mar' },
		{ name: 'Q2', months: [4, 5, 6], label: 'Abr - Jun' },
		{ name: 'Q3', months: [7, 8, 9], label: 'Jul - Sep' },
		{ name: 'Q4', months: [10, 11, 12], label: 'Oct - Dic' },
	]

	const quarterlyData = quarters
		.map((quarter, idx) => {
			const quarterTransactions = transactions.filter((t) =>
				quarter.months.includes(t.date.getMonth() + 1),
			)

			const expenses = quarterTransactions
				.filter((t) => t.type === 'Gasto')
				.reduce((sum, t) => sum + t.amount, 0)
			const income = quarterTransactions
				.filter((t) => t.type === 'Ingreso')
				.reduce((sum, t) => sum + t.amount, 0)
			const balance = income - expenses
			const txCount = quarterTransactions.length

			// En curso: solo si el año seleccionado ES el año actual y el trimestre contiene el mes hoy
			const isCurrent = isCurrentYear && quarter.months.includes(currentMonth)

			// El trimestre está "completo" si todos sus meses son anteriores al mes actual
			const isCompleted = Math.max(...quarter.months) < currentMonth

			return {
				...quarter,
				expenses,
				income,
				balance,
				txCount,
				hasData: expenses > 0 || income > 0,
				isCurrent,
				isCompleted,
				colorClass: QUARTER_COLORS[idx],
			}
		})
		.filter((q) => q.hasData)

	// Calcular el año a partir de las transacciones (para el label)
	const year =
		transactions.length > 0
			? new Date(transactions[0].date).getFullYear()
			: new Date().getFullYear()

	return (
		<div className='space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent'>
			{quarterlyData.length === 0 ? (
				<div className='text-center text-muted-foreground py-10 text-sm'>
					No hay datos para este año
				</div>
			) : (
				quarterlyData.map((quarter) => (
					<div
						key={quarter.name}
						className='rounded-xl border border-border bg-muted/30 px-4 py-4 hover:bg-muted/50 transition-colors'>
						{/* Fila principal */}
						<div className='flex items-start gap-4'>
							{/* Badge Q */}
							<div
								className={`shrink-0 size-10 rounded-lg flex items-center justify-center text-sm font-bold tracking-wide ${quarter.colorClass}`}>
								{quarter.name}
							</div>

							{/* Info principal */}
							<div className='flex-1 min-w-0'>
								<div className='flex items-center gap-2 mb-1'>
									<p className='text-sm font-semibold text-foreground'>
										{quarter.label} {year}
									</p>
									{quarter.isCurrent && (
										<Badge className='text-[9px] px-1.5 py-0 h-4 bg-indigo-500/20 text-indigo-400 border-indigo-500/30 border'>
											EN CURSO
										</Badge>
									)}
								</div>
								<p className='text-sm text-muted-foreground'>
									{quarter.txCount} movimientos realizados
								</p>
							</div>

							{/* Balance + etiqueta */}
							<div className='text-right shrink-0'>
								<p
									className={`text-base font-bold tabular-nums ${
										quarter.balance >= 0 ? 'text-emerald-400' : 'text-red-400'
									}`}>
									{quarter.balance >= 0 ? '+' : ''}
									{formatAmount(quarter.balance)}
								</p>
								<div className='flex items-center gap-1 justify-end mt-0.5'>
									{quarter.isCurrent ? (
										<p className='text-[10px] text-muted-foreground'>
											Saldo actual
										</p>
									) : (
										<>
											<TrendingUp className='size-3 text-muted-foreground' />
											<p className='text-xs text-muted-foreground'>
												Balance neto
											</p>
										</>
									)}
								</div>
							</div>
						</div>

						{/* Fila secundaria: ingresos / gastos */}
						<div className='mt-3 pt-3 border-t border-border/60 grid grid-cols-3 gap-2 text-center'>
							<div>
								<p className='text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5'>
									Ingresos
								</p>
								<p className='text-xs font-bold text-emerald-400'>
									+{formatAmount(quarter.income)}
								</p>
							</div>
							<div>
								<p className='text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5'>
									Gastos
								</p>
								<p className='text-xs font-bold text-red-400'>
									-{formatAmount(quarter.expenses)}
								</p>
							</div>
							<div>
								<p className='text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5'>
									Balance
								</p>
								<p
									className={`text-xs font-bold ${
										quarter.balance >= 0 ? 'text-blue-400' : 'text-orange-400'
									}`}>
									{quarter.balance >= 0 ? '+' : ''}
									{formatAmount(quarter.balance)}
								</p>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	)
}
