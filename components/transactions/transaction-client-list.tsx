'use client'

import { useMemo, useState, useEffect } from 'react'
import type { TransactionWithRelations } from '@/types/transactions.types'
import { Category, Wallet } from '@prisma/client'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/components/transactions/transactionColumns'
import { TransactionSelectYear } from './transaction-select-year'
import { TransactionSelectMonth } from './transaction-select-month'
import { monthNames, cn } from '@/lib/utils'
import { TransactionTabs } from './transaction-tabs'
import { Card } from '@/components/ui/card'
import { ArrowDown, ArrowUp, TrendingUp } from 'lucide-react'
interface TransactionClientListProps {
	initialTransactions: TransactionWithRelations[]
	categories: Category[]
	wallets: Wallet[]
}

export const TransactionClientList = ({
	initialTransactions,
	categories,
	wallets,
}: TransactionClientListProps) => {
	// Obtener el último año y mes con datos
	const latestDateInfo = useMemo(() => {
		if (initialTransactions.length === 0) {
			return { year: 'Años', month: 'Meses' }
		}

		const latestDate = initialTransactions.reduce((latest, t) => {
			if (!t.date) return latest
			const tDate = new Date(t.date)
			return tDate > latest ? tDate : latest
		}, new Date(initialTransactions[0].date))

		return {
			year: latestDate.getFullYear().toString(),
			month: (latestDate.getMonth() + 1).toString(),
		}
	}, [initialTransactions])

	const [filterType, setFilterType] = useState<'Todos' | 'Gasto' | 'Ingreso'>(
		'Todos',
	)
	const [selectedYear, setSelectedYear] = useState<string>(latestDateInfo.year)
	const [selectedMonth, setSelectedMonth] = useState<string>(
		latestDateInfo.month,
	)

	// Obtener años únicos de las transacciones
	const availableYears = useMemo(() => {
		const years = new Set<string>()
		initialTransactions.forEach((transaction) => {
			if (transaction.date) {
				const year = new Date(transaction.date).getFullYear().toString()
				years.add(year)
			}
		})
		return ['Años', ...Array.from(years).sort((a, b) => b.localeCompare(a))]
	}, [initialTransactions])

	// Obtener meses únicos para el año seleccionado
	const availableMonths = useMemo(() => {
		if (selectedYear === 'Años') {
			return [{ value: 'Meses', label: 'Meses' }]
		}

		const months = new Set<number>()
		initialTransactions.forEach((transaction) => {
			if (transaction.date) {
				const date = new Date(transaction.date)
				if (date.getFullYear().toString() === selectedYear) {
					months.add(date.getMonth())
				}
			}
		})

		const sortedMonths = Array.from(months).sort((a, b) => a - b)

		const monthOptions = sortedMonths.map((monthIndex) => ({
			value: (monthIndex + 1).toString(),
			label: monthNames[monthIndex],
		}))

		return [{ value: 'Meses', label: 'Meses' }, ...monthOptions]
	}, [selectedYear, initialTransactions])

	// Resetear el mes al cambiar de año
	useEffect(() => {
		// Al cambiar de año, seleccionar el último mes disponible en ese año
		if (selectedYear !== 'Años') {
			const monthsInYear = new Set<number>()
			initialTransactions.forEach((transaction) => {
				if (transaction.date) {
					const date = new Date(transaction.date)
					if (date.getFullYear().toString() === selectedYear) {
						monthsInYear.add(date.getMonth())
					}
				}
			})

			if (monthsInYear.size > 0) {
				const latestMonth = Math.max(...Array.from(monthsInYear))
				setSelectedMonth((latestMonth + 1).toString())
			} else {
				setSelectedMonth('Meses')
			}
		} else {
			setSelectedMonth('Meses')
		}
	}, [selectedYear, initialTransactions])

	// Calcular sumario del período (independiente del filtro de tipo)
	const { income, expenses, balance } = useMemo(() => {
		let inc = 0
		let exp = 0

		initialTransactions.forEach((t) => {
			if (t.date) {
				const date = new Date(t.date)
				const tYear = date.getFullYear().toString()
				const tMonth = (date.getMonth() + 1).toString()

				const matchYear = selectedYear === 'Años' || tYear === selectedYear
				const matchMonth = selectedMonth === 'Meses' || tMonth === selectedMonth

				if (matchYear && matchMonth) {
					if (t.type === 'Ingreso') inc += Number(t.amount)
					if (t.type === 'Gasto') exp += Number(t.amount)
				}
			}
		})

		return {
			income: inc,
			expenses: exp,
			balance: inc - exp,
		}
	}, [initialTransactions, selectedYear, selectedMonth])

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('es-ES', {
			style: 'currency',
			currency: 'EUR',
		}).format(amount)
	}

	// Filtrar transacciones por tipo, año y mes
	const filteredTransactions = useMemo(() => {
		let filtered = [...initialTransactions]

		if (filterType !== 'Todos') {
			filtered = filtered.filter((t) => t.type === filterType)
		}

		if (selectedYear !== 'Años') {
			filtered = filtered.filter(
				(t) =>
					t.date && new Date(t.date).getFullYear().toString() === selectedYear,
			)
			if (selectedMonth !== 'Meses') {
				filtered = filtered.filter(
					(t) =>
						t.date &&
						(new Date(t.date).getMonth() + 1).toString() === selectedMonth,
				)
			}
		}

		return filtered
	}, [initialTransactions, filterType, selectedYear, selectedMonth])

	return (
		<>
			<div className='grid grid-cols-1 xl:grid-cols-4 gap-10'>
				<div className='flex flex-col gap-4'>
					<Card className='p-6 bg-card border border-border relative overflow-hidden flex flex-col justify-between min-h-[150px] '>
						{/* Ambient Glow */}
						<div className='absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl' />

						<div className='relative z-10'>
							<div className='text-sm font-semibold tracking-wider text-muted-foreground uppercase '>
								Ahorro Neto
							</div>
							<div
								className={cn(
									'text-4xl lg:text-4xl font-extrabold tracking-tight  transition-colors duration-300',
									balance < 0 ? 'text-rose-500' : 'text-foreground',
								)}>
								{formatCurrency(balance)}
							</div>
						</div>

						<div className='relative z-10 mt-auto'>
							<div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary backdrop-blur-md'>
								<TrendingUp className='w-3.5 h-3.5' />
								<span>
									{selectedYear !== 'Años'
										? selectedMonth !== 'Meses'
											? monthNames[Number(selectedMonth) - 1] +
												' ' +
												selectedYear
											: 'Año ' + selectedYear
										: 'Todo el tiempo'}
								</span>
							</div>
						</div>
					</Card>

					<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
						<Card className='p-5 bg-card border border-border overflow-hidden relative flex flex-col justify-between'>
							{/* Persistent Glowing Edges */}

							<div className='absolute bottom-0 left-0 top-12 w-[3px] bg-gradient-to-t from-emerald-500 to-transparent opacity-60' />

							<div className='bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center  ring-1 ring-emerald-500/20'>
								<ArrowDown className='w-6 h-6 text-emerald-500' />
							</div>
							<div>
								<div className='text-sm font-medium text-muted-foreground mb-1'>
									Ingresos
								</div>
								<div className='text-2xl font-bold tracking-tight text-foreground'>
									{formatCurrency(income)}
								</div>
							</div>
						</Card>

						<Card className='p-5 bg-card border border-border overflow-hidden relative flex flex-col justify-between'>
							{/* Persistent Glowing Edges */}

							<div className='absolute bottom-0 left-0 top-12 w-[3px] bg-gradient-to-t from-rose-500 to-transparent opacity-60' />

							<div className='bg-rose-500/10 w-12 h-12 rounded-2xl flex items-center justify-center  ring-1 ring-rose-500/20'>
								<ArrowUp className='w-6 h-6 text-rose-500' />
							</div>
							<div>
								<div className='text-sm font-medium text-muted-foreground mb-1'>
									Gastos
								</div>
								<div className='text-2xl font-bold tracking-tight text-foreground'>
									{formatCurrency(expenses)}
								</div>
							</div>
						</Card>
					</div>
				</div>
				<div className='xl:col-span-3'>
					<DataTable
						columns={columns({ wallets, categories })}
						data={filteredTransactions}
						initialColumnVisibility={{ type: false }}
						toolbar={
							<div className='flex items-center flex-wrap gap-4'>
								<TransactionTabs
									value={filterType}
									onValueChange={setFilterType}
								/>
								<TransactionSelectYear
									value={selectedYear}
									onValueChange={setSelectedYear}
									years={availableYears}
								/>
								<TransactionSelectMonth
									value={selectedMonth}
									onValueChange={setSelectedMonth}
									months={availableMonths}
								/>
							</div>
						}
					/>
				</div>
			</div>
		</>
	)
}
