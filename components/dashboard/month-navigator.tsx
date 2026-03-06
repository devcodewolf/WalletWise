'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MONTH_NAMES, type MonthYear } from '@/lib/constants'

interface MonthNavigatorProps {
	availableMonths: MonthYear[] // ordenados desc: [más reciente, ..., más antiguo]
}

export function MonthNavigator({ availableMonths }: MonthNavigatorProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	if (availableMonths.length === 0) return null

	// El mes actualmente seleccionado (por defecto el primero = más reciente)
	const defaultYear = availableMonths[0].year
	const defaultMonth = availableMonths[0].month

	const year = parseInt(searchParams.get('year') ?? String(defaultYear))
	const month = parseInt(searchParams.get('month') ?? String(defaultMonth))

	// Índice del mes actual en la lista
	const currentIndex = availableMonths.findIndex(
		(m) => m.year === year && m.month === month
	)
	// Si por alguna razón no se encuentra (ej: URL manual con mes sin datos), usar el primero
	const safeIndex = currentIndex === -1 ? 0 : currentIndex

	const hasPrev = safeIndex < availableMonths.length - 1 // más antiguo
	const hasNext = safeIndex > 0 // más reciente

	const navigate = (direction: 'prev' | 'next') => {
		const targetIndex = direction === 'prev' ? safeIndex + 1 : safeIndex - 1
		const target = availableMonths[targetIndex]
		if (!target) return

		const params = new URLSearchParams(searchParams.toString())
		params.set('year', String(target.year))
		params.set('month', String(target.month))
		router.replace(`?${params.toString()}`)
	}

	return (
		<div className='flex items-center w-fit gap-4 ml-auto'>
			<button
				onClick={() => navigate('prev')}
				disabled={!hasPrev}
				className='size-8 flex items-center justify-center bg-card hover:bg-card/0 rounded-[8px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed'>
				<ChevronLeft />
			</button>
			<p className='text-sm font-semibold min-w-[130px] text-center'>
				{MONTH_NAMES[month - 1]} {year}
			</p>
			<button
				onClick={() => navigate('next')}
				disabled={!hasNext}
				className='size-8 flex items-center justify-center bg-card hover:bg-card/0 rounded-[8px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed'>
				<ChevronRight />
			</button>
		</div>
	)
}
