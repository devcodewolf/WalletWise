'use client'

import { RecurringTransactionWithRelations } from '@/types/transactions.types'
import { Card } from '@/components/ui/card'
import { EditRecurring } from './edit-recurring'
import { DeleteRecurring } from './delete-recurring'
import { Badge } from '@/components/ui/badge'

import {
	ShoppingBag,
	Landmark,
	Home,
	Car,
	Zap,
	Utensils,
	Plane,
	Gift,
	CreditCard,
	DollarSign,
	HeartPulse,
	GraduationCap,
	Smartphone,
	Wifi,
	Shirt,
	Gamepad2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
	ShoppingBag,
	Bank: Landmark,
	Home,
	Car,
	Energy: Zap,
	Utensils,
	Plane,
	Gift,
	CreditCard,
	DollarSign,
	HeartPulse,
	GraduationCap,
	Smartphone,
	Wifi,
	Shirt,
	Gamepad2,
}

interface RecurringCardProps {
	recurring: RecurringTransactionWithRelations
}

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
	}).format(amount)
}

function getNextPaymentDate(dayOfMonth: number, frequency: string) {
	const today = new Date()
	const nextDate = new Date(today.getFullYear(), today.getMonth(), dayOfMonth)
	if (nextDate < today) {
		if (frequency === 'MONTHLY') {
			nextDate.setMonth(nextDate.getMonth() + 1)
		} else {
			nextDate.setFullYear(nextDate.getFullYear() + 1)
		}
	}
	return nextDate.toLocaleDateString('es-ES', {
		month: 'short',
		day: '2-digit',
	})
}

export function RecurringCard({ recurring }: RecurringCardProps) {
	const category = recurring.category
	const Icon = category?.iconName
		? ICON_MAP[category.iconName] || ShoppingBag
		: ShoppingBag
	const borderColor = category?.color || '#3b82f6'

	const generatedCount = recurring._count?.transactions || 0

	const nextPaymentStr = getNextPaymentDate(
		recurring.dayOfMonth,
		recurring.frequency,
	)
	const startDateStr = new Date(recurring.createdAt).toLocaleDateString(
		'es-ES',
		{ year: 'numeric', month: 'short', day: '2-digit' },
	)

	return (
		<Card
			className='relative overflow-hidden flex flex-col justify-between py-0 gap-2'
			style={{ borderTop: `4px solid ${borderColor}` }}>
			<div className='p-5 space-y-4 flex-1'>
				<div className='flex justify-between items-start gap-4'>
					{/* Logo y título */}
					<div className='flex items-center gap-3 min-w-0'>
						<div
							className='size-8 rounded-md flex items-center justify-center shrink-0'
							style={{
								backgroundColor: `${borderColor}20`,
								color: borderColor,
							}}>
							<Icon size={16} />
						</div>
						<h3 className='font-semibold text-sm truncate'>
							{recurring.description || 'Sin descripción'}
						</h3>
					</div>

					{/* Botones de acción */}
					<div className='flex items-center gap-1 shrink-0'>
						<EditRecurring recurring={recurring} />
						<DeleteRecurring recurring={recurring} />
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<span className='text-sm text-muted-foreground font-semibold'>
						Categoría:
					</span>
					{category ? (
						<Badge
							variant='secondary'
							style={{
								backgroundColor: `${borderColor}20`,
								color: borderColor,
							}}
							className='text-xs px-2 py-0'>
							{category.name}
						</Badge>
					) : (
						<span className='text-sm text-muted-foreground'>Ninguna</span>
					)}
				</div>

				<div className='flex items-end justify-between'>
					<div>
						<p className='text-2xl font-bold tracking-tight'>
							{formatCurrency(recurring.amount)}
						</p>
						<p className='text-sm text-muted-foreground'>
							{recurring.frequency === 'MONTHLY' ? 'Mensual' : 'Anual'}
						</p>
					</div>
					<div className='text-right'>
						<div className='inline-block bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground font-semibold mb-1'>
							<span className='font-bold'>Próximo:</span> {nextPaymentStr}
						</div>
						<p className='text-xs text-muted-foreground font-semibold'>
							<span className='font-bold'>Inicio:</span> {startDateStr}
						</p>
					</div>
				</div>
			</div>

			{/* Bottom Action Area / Info */}
			<div className='border-t px-5 py-3 bg-muted/30 flex justify-between rounded-b-xl'>
				<p className='text-sm font-semibold text-muted-foreground'>
					Total Generado: {generatedCount}{' '}
					{recurring.type === 'Ingreso' ? 'ingresos' : 'gastos'}
				</p>
				{!recurring.isActive && (
					<Badge
						variant='outline'
						className='text-xs  bg-foreground/20 border-dashed py-0 h-6'>
						Inactivo
					</Badge>
				)}
			</div>
		</Card>
	)
}
