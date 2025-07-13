'use client';

import { DataTable } from '@/components/ui/data-table';

import { AddCategory } from './add-category';

import { useEffect, useState } from 'react';
import { Category } from '@prisma/client';
import { columns } from './categoryColumns';
import { Inbox, SquareLibrary } from 'lucide-react';

export const CategoryList = ({ data: initialData }: { data: Category[] }) => {
	const [categories, setCategories] = useState<Category[]>(initialData);

	// Update categories when initialData changes
	useEffect(() => {
		console.log('hola effect');
		setCategories(initialData);
	}, [initialData]);

	return (
		<div className="space-y-4">
			{/* <AddCategory onAddCategory={handleAddCategory} /> */}
			{/* Header */}
			<header className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-3xl font-bold flex items-center gap-2">
						<Inbox className="size-8" />
						Categorías
					</h2>
					<p className="text-gray-400 mt-1">Gestión de categorías</p>
				</div>
				<AddCategory />
			</header>
			<DataTable columns={columns} data={categories} />
		</div>
	);
};
