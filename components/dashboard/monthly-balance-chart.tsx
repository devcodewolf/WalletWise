'use client'

import { PieChart, Pie, Cell } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'

interface MonthlyBalanceChartClientProps {
	income: number
	expense: number
	balance: number
	month: string
}

const chartConfig = {
	ingresos: { label: 'Ingresos', color: '#3b6ee8' },
	gastos: { label: 'Gastos', color: '#f5a623' },
}

export function MonthlyBalanceChartClient({
	income,
	expense,
	balance,
	month,
}: MonthlyBalanceChartClientProps) {
	const total = income + expense
	const isEmpty = total === 0

	const chartData = isEmpty
		? [{ name: 'vacío', value: 1 }]
		: [
				{ name: 'ingresos', value: income },
				{ name: 'gastos', value: expense },
			]

	const COLORS = isEmpty ? ['#1f2937'] : ['#3b6ee8', '#f5a623']

	return (
		<div className='flex flex-col items-center justify-center flex-1 select-none'>
			{/* Mes */}
			<p className='text-xs text-muted-foreground mb-3'>{month}</p>

			{/* Contenedor del gráfico con etiquetas flotantes */}
			<div className='relative w-full max-w-[300px] h-[240px]'>
				{/* Etiqueta gastos — arriba izquierda */}
				<div className='absolute top-2 left-0 flex flex-col items-start z-10'>
					<div className='flex items-center gap-1.5'>
						<span className='text-[11px] text-muted-foreground font-medium'>
							Gastos
						</span>
						<span className='w-2.5 h-2.5 rounded-full bg-[#f5a623] shrink-0' />
					</div>
					<span className='text-sm font-bold text-white mr-4'>
						{expense.toLocaleString('es-ES', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
						€
					</span>
				</div>

				{/* Donut chart */}
				<ChartContainer config={chartConfig} className='w-full h-full'>
					<PieChart>
						<Pie
							data={chartData}
							cx='50%'
							cy='50%'
							innerRadius={88}
							outerRadius={120}
							paddingAngle={isEmpty ? 0 : 4}
							dataKey='value'
							startAngle={90}
							endAngle={-270}
							strokeWidth={0}>
							{chartData.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index]} />
							))}
						</Pie>
					</PieChart>
				</ChartContainer>

				{/* Centro del donut: Balance */}
				<div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
					<span className='text-xs text-muted-foreground font-medium'>
						Balance
					</span>
					<span
						className={`text-sm font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
						{balance >= 0 ? '+' : ''}
						{balance.toLocaleString('es-ES', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
						€
					</span>
				</div>

				{/* Etiqueta ingresos — abajo derecha */}
				<div className='absolute bottom-2 -right-2 flex flex-col items-end z-10'>
					<div className='flex items-center gap-1.5'>
						<span className='w-2.5 h-2.5 rounded-full bg-[#3b6ee8] shrink-0' />
						<span className='text-[11px] text-muted-foreground font-medium'>
							Ingresos
						</span>
					</div>
					<span className='text-sm font-bold text-white ml-4'>
						{income.toLocaleString('es-ES', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
						€
					</span>
				</div>
			</div>

			{/* Balance neto debajo */}
			{/* <div className='mt-3 flex items-center gap-1.5'>
				<span className='text-xs text-muted-foreground'>Balance:</span>
				<span
					className={`text-sm font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
					{balance >= 0 ? '+' : ''}
					{balance.toLocaleString('es-ES', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
					€
				</span>
			</div> */}
		</div>
	)
}
