'use client';

import * as React from 'react';
import {
	ShoppingBag,
	Coffee,
	Home,
	Car,
	Briefcase,
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconSelectorProps {
	selectedIcon: string;
	onSelectIcon: (iconName: string) => void;
	color?: string;
}

type IconOption = {
	name: string;
	icon: React.ElementType;
};

export function IconSelector({
	selectedIcon,
	onSelectIcon,
}: // color = '#fff',
IconSelectorProps) {
	const icons: IconOption[] = [
		{ name: 'ShoppingBag', icon: ShoppingBag },
		{ name: 'Coffee', icon: Coffee },
		{ name: 'Home', icon: Home },
		{ name: 'Car', icon: Car },
		{ name: 'Briefcase', icon: Briefcase },
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
	];

	return (
		<div className="grid grid-cols-8 gap-2">
			{icons.map((iconOption) => {
				const Icon = iconOption.icon;
				return (
					<div
						key={iconOption.name}
						className={cn(
							'flex size-10 cursor-pointer items-center justify-center rounded-full border',
							selectedIcon === iconOption.name
								? 'border-primary bg-primary/10'
								: 'border-muted hover:border-primary'
						)}
						onClick={() => onSelectIcon(iconOption.name)}>
						<Icon className="size-5" />
					</div>
				);
			})}
		</div>
	);
}
