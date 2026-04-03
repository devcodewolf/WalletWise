'use client'

import { useState } from 'react'
import { ChartTypeTabs, type ChartType } from '@/components/chart-type-tabs'
import { YearlyChart } from '@/components/statistics/chart-yearly'
import { YearlyLineChart } from '@/components/statistics/chart-yearly-line'
import { Transaction } from '@prisma/client'

interface YearlyChartSwitcherProps {
	transactions: Transaction[]
	year: number
	chartType?: ChartType
}

export function YearlyChartSwitcher({
	transactions,
	year,
	chartType,
}: YearlyChartSwitcherProps) {
	const [chartTypeView, setChartTypeView] = useState<ChartType>(
		chartType ?? 'Linea',
	)

	return (
		<>
			{/* Header con título y selector de tipo */}
			<div className='flex items-center justify-between gap-2'>
				<p className='text-muted-foreground text-xl mt-1'>
					Estadísticas anual {year}
				</p>
				<ChartTypeTabs value={chartTypeView} onChange={setChartTypeView} />
			</div>

			{/* Gráfico activo */}
			{chartTypeView === 'Linea' ? (
				<YearlyLineChart transactions={transactions} />
			) : (
				<YearlyChart transactions={transactions} />
			)}
		</>
	)
}
