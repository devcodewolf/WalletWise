'use client'

import { YearSelect } from '@/components/statistics/select-year'
import { Transaction } from '@prisma/client'
import { useStatistics } from '@/hooks/use-statistics'
import { SummaryMonthly } from './summary-monthly'
import { CalendarDays, CalendarRange } from 'lucide-react'
import { QuarterlySummary } from './summary-quarterly'
import { Separator } from '../ui/separator'

export default function StatisticsSumary({
	transactions,
}: {
	transactions: Transaction[]
}) {
	const { selectedYear, setSelectedYear, availableYears, yearlyTransactions } =
		useStatistics({
			transactions: transactions,
		})

	return (
		<>
			<div className='flex items-center justify-end '>
				<YearSelect
					value={selectedYear}
					onChange={setSelectedYear}
					years={availableYears}
				/>
			</div>
			<div className='grid grid-cols-1 xl:grid-cols-2'>
				<div className='border-b pb-6 xl:border-b-0 xl:border-r pr-4 xl:pr-8 border-border'>
					<div className='flex items-center justify-between mb-4'>
						<div>
							<div className='flex items-center gap-2'>
								<CalendarRange className='size-5' />
								<Separator
									orientation='vertical'
									className='data-[orientation=vertical]:h-6'
								/>
								<h3 className='text-lg font-semibold leading-none flex items-center gap-2'>
									Resumen Mensual - {selectedYear}
								</h3>
							</div>
							{/* <p className='text-sm text-muted-foreground mt-1'>
								Desglose por meses año {selectedYear}
							</p> */}
						</div>
					</div>
					{/* <Separator className='my-2' /> */}
					<SummaryMonthly transactions={yearlyTransactions} />
				</div>
				<div className='mt-6 xl:mt-0 xl-pl-8'>
					<div className='flex items-center justify-between mb-4'>
						<div>
							<div className='flex items-center gap-2'>
								<CalendarDays className='size-5' />
								<Separator
									orientation='vertical'
									className='data-[orientation=vertical]:h-6'
								/>
								<h3 className='text-lg font-semibold leading-none flex items-center gap-2'>
									Resumen Trimestral - {selectedYear}
								</h3>
							</div>
							{/* <p className='text-sm text-muted-foreground mt-1'>
								Año {selectedYear}
							</p> */}
						</div>
					</div>
					{/* <Separator className='my-2' /> */}
					<QuarterlySummary
						transactions={yearlyTransactions}
						selectedYear={selectedYear}
					/>
				</div>
			</div>
		</>
	)
}
