'use client'

import { Transaction } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Euro, Minus } from 'lucide-react'

interface AnnualBalanceProps {
	transactions: Transaction[]
}

function formatAmount(amount: number, signed = false): string {
	const formatted = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0,
	}).format(Math.abs(amount))

	if (signed) {
		return amount >= 0 ? `+${formatted}` : `-${formatted}`
	}
	return amount < 0 ? `-${formatted}` : formatted
}

export function AnnualBalance({ transactions }: AnnualBalanceProps) {
	const balancesByYear = transactions.reduce(
		(acc, transaction) => {
			const year = new Date(transaction.date).getFullYear()
			if (!acc[year]) {
				acc[year] = { income: 0, expenses: 0, year }
			}
			if (transaction.type === 'Ingreso') {
				acc[year].income += transaction.amount
			} else if (transaction.type === 'Gasto') {
				acc[year].expenses += transaction.amount
			}
			return acc
		},
		{} as Record<number, { income: number; expenses: number; year: number }>,
	)

	const yearlyBalances = Object.values(balancesByYear)
		.map(({ year, income, expenses }) => ({
			year,
			income,
			expenses,
			balance: income - expenses,
		}))
		.sort((a, b) => b.year - a.year)

	const currentYear = new Date().getFullYear()
	// currentYear = 2025

	if (yearlyBalances.length === 0) {
		return (
			<div className='text-center text-muted-foreground py-8 text-md'>
				No hay datos disponibles
			</div>
		)
	}

	return (
		<div className='space-y-3 max-h-[420px] overflow-y-auto pr-3'>
			{yearlyBalances.map((yearData) => {
				const isCurrent = yearData.year === currentYear
				const balancePositive = yearData.balance >= 0

				return (
					<div key={yearData.year} className={cn('relative ')}>
						{/* Layout principal: info a la izquierda + balance a la derecha */}
						<div
							className={`flex items-stretch overflow-hidden rounded-2xl border border-border 
								${isCurrent ? 'bg-gradient-to-bl from-blue-500 to-blue-700' : 'bg-black/10 dark:bg-white/15'}`}>
							<div className='flex-1'>
								<div className={`grid grid-cols-3 `}>
									{/*  Columna izquierda: año + ingresos + gastos */}
									<div className='flex flex-col bg-muted p-5'>
										<p className='text-md font-semibold text-foreground mb-3'>
											Año {yearData.year}
										</p>
										<div className='flex items-center gap-1.5'>
											{/* Icono $ circular verde */}
											<Euro className='size-6 text-emerald-500 border border-emerald-500 rounded-full p-1 shrink-0' />
											<span className='text-sm font-semibold text-muted-foreground leading-tight'>
												Ingresos
											</span>
										</div>
										<span className='text-base font-semibold text-emerald-500 pl-0.5'>
											{formatAmount(yearData.income, true)}
										</span>
									</div>

									{/* Gastos */}
									<div className='flex flex-col bg-muted justify-end p-5 rounded-br-2xl overflow-hidden'>
										<div className='flex items-center gap-1.5'>
											{/* Icono ⊖ circular rojo */}
											<Minus className='size-6 text-rose-500 border border-rose-500 rounded-full p-1 shrink-0' />
											<span className='text-sm font-semibold text-muted-foreground leading-tight'>
												Gastos
											</span>
										</div>
										<span className='text-base font-semibold text-rose-500 pl-0.5'>
											{formatAmount(-yearData.expenses, true)}
										</span>
									</div>

									{/* Balance inline solo para años pasados */}
									<div
										className={cn(
											'relative flex flex-col justify-end p-5 bg-transparent',
										)}>
										{/* Curva cóncava superior (inverted border radius) */}
										<div
											className='absolute top-0 left-0 size-4'
											style={{
												background:
													'radial-gradient(circle at 100% 100%, transparent 16px, var(--muted) 16px)',
											}}
										/>
										<span
											className={cn(
												'text-base font-bold',
												isCurrent ? 'text-white' : '',
											)}>
											Balance
										</span>
										<span
											className={cn(
												'text-lg font-semibold',
												balancePositive ? 'text-emerald-500' : 'text-rose-500',
												isCurrent ? 'text-white' : '',
											)}>
											{formatAmount(yearData.balance, true)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
