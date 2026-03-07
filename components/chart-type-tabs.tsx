'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type ChartType = 'Linea' | 'Barras'

interface ChartTypeTabsProps {
	value: ChartType
	onChange: (value: ChartType) => void
}

export function ChartTypeTabs({ value, onChange }: ChartTypeTabsProps) {
	return (
		<Tabs value={value} onValueChange={(v) => onChange(v as ChartType)}>
			<TabsList className='dark:bg-neutral-900'>
				<TabsTrigger
					value='Linea'
					className='data-[state=active]:ring data-[state=active]:ring-neutral-300 dark:data-[state=active]:ring-neutral-800/80 data-[state=active]:shadow-xs'>
					Línea
				</TabsTrigger>
				<TabsTrigger
					value='Barras'
					className='data-[state=active]:ring data-[state=active]:ring-neutral-300 dark:data-[state=active]:ring-neutral-800/80 data-[state=active]:shadow-xs'>
					Barras
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
