'use client'

import * as React from 'react'
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
import { cn } from '@/lib/utils'

interface IconSelectorProps {
	selectedIcon: string
	onSelectIcon: (iconName: string) => void
	color?: string
}

type IconOption = {
	name: string
	icon: React.ElementType
}

const ICONS: IconOption[] = [
	{ name: 'ShoppingBag', icon: ShoppingBag },
	{ name: 'Bank', icon: Landmark },
	{ name: 'Home', icon: Home },
	{ name: 'Car', icon: Car },
	{ name: 'Energy', icon: Zap },
	{ name: 'Utensils', icon: Utensils },
	{ name: 'Plane', icon: Plane },
	{ name: 'Gift', icon: Gift },
	{ name: 'CreditCard', icon: CreditCard },
	{ name: 'DollarSign', icon: DollarSign },
	{ name: 'HeartPulse', icon: HeartPulse },
	{ name: 'GraduationCap', icon: GraduationCap },
	{ name: 'Smartphone', icon: Smartphone },
	{ name: 'Wifi', icon: Wifi },
	{ name: 'Shirt', icon: Shirt },
	{ name: 'Gamepad2', icon: Gamepad2 },
]

export function IconSelector({
	selectedIcon,
	onSelectIcon,
	color = 'currentColor',
}: IconSelectorProps) {
	return (
		<div className='grid grid-cols-8 gap-2'>
			{ICONS.map(({ name, icon: Icon }) => (
				<button
					key={name}
					type='button'
					title={name}
					onClick={() => onSelectIcon(name)}
					className={cn(
						'flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border transition-all duration-150',
						selectedIcon === name ? ' scale-110' : ' hover:border-primary ',
					)}
					style={
						selectedIcon === name
							? { backgroundColor: `${color}22`, borderColor: color }
							: {}
					}>
					<Icon
						className='size-4.5'
						style={{ color: selectedIcon === name ? color : undefined }}
					/>
				</button>
			))}
		</div>
	)
}
