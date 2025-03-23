'use client';

import { DataTable } from '@/components/ui/data-table';

import { AddCategory } from './add-category';

import { useEffect, useState } from 'react';
import { Category } from '@prisma/client';
import { columns } from './categoryColumns';

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
			<AddCategory />
			<DataTable columns={columns} data={categories} />
		</div>
	);
};
