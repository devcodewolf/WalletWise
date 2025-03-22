'use client';

import { DataTable } from '@/components/ui/data-table';
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

import { AddCategory } from './add-category';
import { EditCategory } from './edit-category';
import { DeleteCategory } from './delete-category';
import { useEffect, useState } from 'react';
import { Category } from '@prisma/client';

const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'iconName',
		header: 'Icon',
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
			return <Icon className="h-4 w-4" style={{ color }} />;
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		id: 'actions',
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

export const CategoryList = ({ data: initialData }: { data: Category[] }) => {
	const [categories, setCategories] = useState<Category[]>(initialData);

	// Update categories when initialData changes
	useEffect(() => {
		console.log('hola effect');
		setCategories(initialData);
	}, [initialData]);

	return (
		<div className="space-y-4">
			<AddCategory />
			<DataTable columns={columns} data={categories} />
		</div>
	);
};
