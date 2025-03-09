'use client';

import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
	Edit,
	Trash2,
	ArrowUpDown,
	ShoppingBag,
	Coffee,
	Home,
	Car,
	Briefcase,
} from 'lucide-react';
import { Category } from '@/types';
import { AddCategory } from './add-category';
import { useState } from 'react';

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
			};
			const Icon = IconMap[iconName] || ShoppingBag;
			return <Icon className="h-4 w-4" />;
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
				<div className="flex  justify-end">
					<Button variant="ghost" size="sm">
						<Edit className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="sm">
						<Trash2 className="h-4 w-4 text-red-500" />
					</Button>
				</div>
			);
		},
	},
];

export const CategoryList = ({ data: initialData }: { data: Category[] }) => {
	const [categories, setCategories] = useState<Category[]>(initialData);

	const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
		const id = (categories.length + 1).toString();
		const categoryWithId = { ...newCategory, id };
		setCategories([...categories, categoryWithId]);
	};

	return (
		<div className="space-y-4">
			<AddCategory onAddCategory={handleAddCategory} />
			<DataTable columns={columns} data={categories} />
		</div>
	);
};
