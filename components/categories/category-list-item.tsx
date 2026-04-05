'use client'

import { Category } from '@prisma/client'
import { EditCategory } from './edit-category'
import { DeleteCategory } from './delete-category'
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

interface CategoryListItemProps {
	category: Category
}

export function CategoryListItem({ category }: CategoryListItemProps) {
	const Icon = ICON_MAP[category.iconName] ?? ShoppingBag
	const isIncome = category.type === 'Ingreso'

	return (
		<li className='flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:bg-muted/40 transition-colors group'>
			{/* Icono con color de fondo */}
			<span
				className='shrink-0 flex items-center justify-center w-9 h-9 rounded-full'
				style={{ backgroundColor: `${category.color}22` }}>
				<Icon
					className='size-5'
					style={{ color: category.color }}
				/>
			</span>

			{/* Nombre + badge tipo */}
			<div className='flex items-center gap-2 flex-1 min-w-0'>
				<span className='text-sm font-semibold truncate'>{category.name}</span>
				<span
					className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
						isIncome
							? 'bg-green-500/10 text-green-400'
							: 'bg-orange-500/10 text-orange-400'
					}`}>
					{category.type}
				</span>
			</div>

			{/* Acciones */}
			<div className='flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity'>
				<EditCategory category={category} />
				<DeleteCategory category={category} />
			</div>
		</li>
	)
}
