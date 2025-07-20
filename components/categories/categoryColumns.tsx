'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
	ArrowUpDown,
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

import { EditCategory } from './edit-category';

import { Category } from '@prisma/client';
import { DeleteCategory } from './delete-category';

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'icono',
		header: 'Icono',
		cell: ({ row }) => {
			const iconName = row.original.iconName;
			// Map string icon names to Lucide components
			const IconMap: Record<string, React.ElementType> = {
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
			};
			const Icon = IconMap[iconName] || ShoppingBag;
			const color = row.original.color;
			return (
				<Icon
					className="size-8 bg-secondary dark:bg-secondary rounded-full p-2"
					style={{ color }}
				/>
			);
		},
	},
	{
		accessorKey: 'nombre',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Nombre
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'tipo',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Tipo
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		id: 'acciones',
		cell: ({ row }) => {
			return (
				<div className="flex justify-end">
					<EditCategory category={row.original} />
					<DeleteCategory category={row.original} />
				</div>
			);
		},
	},
];
