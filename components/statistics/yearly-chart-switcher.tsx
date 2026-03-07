'use client'

import { useState } from 'react'
import { ChartTypeTabs, type ChartType } from '@/components/chart-type-tabs'
import { YearlyChart } from '@/components/statistics/chart-yearly'
import { YearlyLineChart } from '@/components/statistics/chart-yearly-line'
import { Transaction } from '@prisma/client'

interface YearlyChartSwitcherProps {
	transactions: Transaction[]
	year: number
}

export function YearlyChartSwitcher({
	transactions,
	year,
}: YearlyChartSwitcherProps) {
	const [chartType, setChartType] = useState<ChartType>('Linea')

	return (
		<>
			{/* Header con título y selector de tipo */}
			<div className='flex items-center justify-between gap-2'>
				<p className='text-gray-400 text-xl mt-1'>Estadísticas anual {year}</p>
				<ChartTypeTabs value={chartType} onChange={setChartType} />
			</div>

			{/* Gráfico activo */}
			{chartType === 'Linea' ? (
				<YearlyLineChart transactions={transactions} />
			) : (
				<YearlyChart transactions={transactions} />
			)}
		</>
	)
}
