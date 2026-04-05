'use client'

import { Bar, BarChart, Cell, XAxis } from 'recharts'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Transaction } from '@prisma/client'
import { useTheme } from 'next-themes'

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0,
	}).format(amount)
}

interface MonthlyChartProps {
	selectedMonth: number
	selectedYear: number
	transactions: Transaction[]
}

const chartConfig = {
	gastos: {
		label: 'Gastos',
		color: '#e11d48',
	},
	ingresos: {
		label: 'Ingresos',
		color: '#22c55e',
	},
} satisfies ChartConfig

export function MonthlyChart({ transactions }: MonthlyChartProps) {
	const { resolvedTheme } = useTheme()
	const barBgFill =
		resolvedTheme === 'light'
			? 'hsl(220 13% 91% / 0.7)'
			: 'hsl(220 13% 30% / 0.3)'
	const totalGastos = transactions
		.filter((t) => t.type === 'Gasto')
		.reduce((sum, t) => sum + t.amount, 0)

	const totalIngresos = transactions
		.filter((t) => t.type === 'Ingreso')
		.reduce((sum, t) => sum + t.amount, 0)

	const savingsPercent =
		totalIngresos > 0
			? Math.round(((totalIngresos - totalGastos) / totalIngresos) * 100)
			: 0

	const savingsProgressWidth = Math.min(Math.max(savingsPercent, 0), 100)

	// Un único array de datos con una sola clave de valor
	const chartData = [
		{ categoria: 'Gastos', valor: totalGastos },
		{ categoria: 'Ingresos', valor: totalIngresos },
	]

	const barColors = [chartConfig.gastos.color, chartConfig.ingresos.color]

	if (totalGastos === 0 && totalIngresos === 0) {
		return (
			<div className='flex items-center justify-center h-[200px] text-muted-foreground text-sm'>
				No hay transacciones este mes
			</div>
		)
	}

	return (
		<div className='flex flex-col'>
			{/* Gráfico de barras pill — un solo Bar con Cell por color */}
			<ChartContainer
				config={chartConfig}
				className='h-[260px] w-full max-w-[300px] mx-auto'>
				<BarChart
					accessibilityLayer
					data={chartData}
					barCategoryGap='25%'
					margin={{ top: 16, right: 20, left: 20, bottom: 0 }}>
					<XAxis
						dataKey='categoria'
						tickLine={false}
						axisLine={false}
						tick={{
							fill: 'hsl(var(--muted-foreground))',
							fontSize: 13,
							fontWeight: 500,
						}}
						tickMargin={10}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					{/* Un único Bar: background da el pill oscuro, Cell colorea cada barra */}
					<Bar
						dataKey='valor'
						radius={12}
						background={{ fill: barBgFill, radius: 12 }}>
						{chartData.map((_, index) => (
							<Cell key={`cell-${index}`} fill={barColors[index]} />
						))}
					</Bar>
				</BarChart>
			</ChartContainer>

			{/* Montos centrados bajo cada barra */}
			<div className='flex justify-center max-w-[300px] mx-auto gap-[88px]'>
				<span className='text-base font-bold text-rose-500 pl-2'>
					{formatCurrency(totalGastos)}
				</span>
				<span className='text-base font-bold text-emerald-500'>
					{formatCurrency(totalIngresos)}
				</span>
			</div>

			{/* Estado de ahorro */}
			<div className='mt-4 w-[300px] mx-auto rounded-xl bg-muted/40 border border-border/50 px-4 py-3'>
				<div className='flex items-center justify-between'>
					<span className='text-sm text-muted-foreground whitespace-nowrap'>
						Estado de ahorro
					</span>
					<span
						className={`text-sm font-semibold whitespace-nowrap px-2 py-1 rounded-lg ${
							savingsPercent >= 0
								? 'text-emerald-500 bg-emerald-500/10 '
								: 'text-rose-500 bg-rose-500/10'
						}`}>
						{savingsPercent >= 0 ? '+' : ''}
						{savingsPercent}%
					</span>
				</div>
				<div className='h-2 mt-3 rounded-full bg-muted overflow-hidden'>
					<div
						className='h-full rounded-full bg-emerald-500 transition-all duration-500'
						style={{ width: `${savingsProgressWidth}%` }}
					/>
				</div>
			</div>
		</div>
	)
}
