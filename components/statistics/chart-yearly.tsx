'use client'

import {
	Bar,
	BarChart,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Cell,
} from 'recharts'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Transaction } from '@prisma/client'
import { useMemo } from 'react'
import { YearlySummary } from '@/components/statistics/yearly-summary'

interface YearlyChartProps {
	transactions: Transaction[]
}

const MONTH_NAMES = [
	'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
	'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const chartConfig = {
	gastos: { label: 'Gastos', color: '#93c5fd' },
	ingresos: { label: 'Ingresos', color: '#3b82f6' },
}


function formatAxisTick(value: number) {
	if (value >= 1000) return `€${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
	return `€${value}`
}

export function YearlyChart({ transactions }: YearlyChartProps) {
	const monthlyData = useMemo(() =>
		Array.from({ length: 12 }, (_, i) => {
			const month = i + 1
			const monthTransactions = transactions.filter(
				(t) => (t.date instanceof Date ? t.date : new Date(t.date)).getMonth() + 1 === month,
			)
			const gastos = monthTransactions
				.filter((t) => t.type === 'Gasto')
				.reduce((sum, t) => sum + t.amount, 0)
			const ingresos = monthTransactions
				.filter((t) => t.type === 'Ingreso')
				.reduce((sum, t) => sum + t.amount, 0)

			return { month: MONTH_NAMES[i], gastos, ingresos }
		}),
		[transactions],
	)

	const totalGastos = monthlyData.reduce((s, d) => s + d.gastos, 0)
	const totalIngresos = monthlyData.reduce((s, d) => s + d.ingresos, 0)
	const balanceNeto = totalIngresos - totalGastos

	return (
		<div className='flex flex-col flex-1 min-h-0 gap-3'>
			{/* Gráfico de barras */}
			<ChartContainer config={chartConfig} className='flex-1 min-h-0 w-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						data={monthlyData}
						barCategoryGap='20%'
						barGap={3}
						margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
						<XAxis
							dataKey='month'
							stroke='#6B7280'
							fontSize={11}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
						stroke='#6B7280'
						fontSize={10}
						tickFormatter={formatAxisTick}
						tickLine={false}
						axisLine={false}
						width={45}
					/>
						<ChartTooltip
							content={<ChartTooltipContent />}
							contentStyle={{
								backgroundColor: '#111827',
								border: '1px solid #1F2937',
								borderRadius: '8px',
								color: '#F9FAFB',
							}}
						/>
						{/* Barras ingresos — azul oscuro */}
						<Bar dataKey='ingresos' radius={[4, 4, 0, 0]}>
							{monthlyData.map((_, i) => (
								<Cell key={i} fill='#3b82f6' />
							))}
						</Bar>
						{/* Barras gastos — azul claro */}
						<Bar dataKey='gastos' radius={[4, 4, 0, 0]}>
							{monthlyData.map((_, i) => (
								<Cell key={i} fill='#93c5fd' />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>

			<YearlySummary
				totalIngresos={totalIngresos}
				totalGastos={totalGastos}
				balanceNeto={balanceNeto}
			/>
		</div>
	)
}
