'use client';

import { DataTable } from '@/components/ui/data-table';

import { AddCategory } from './add-category';

import { useEffect, useState } from 'react';
import { Category } from '@prisma/client';
import { columns } from './categoryColumns';
import { Inbox } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const CategoryList = ({ data: initialData }: { data: Category[] }) => {
	const [categories, setCategories] = useState<Category[]>(initialData);

	// Update categories when initialData changes
	useEffect(() => {
		console.log('hola effect');
		setCategories(initialData);
	}, [initialData]);

	console.log(categories);

	return (
		<Card className="p-6 gap-4">
			<CardHeader className="flex-row items-center p-0">
				<div>
					<h2 className="text-2xl font-bold flex items-center gap-2">
						<Inbox className="size-6" />
						<Separator
							orientation="vertical"
							className="data-[orientation=vertical]:h-6"
						/>
						Categorías
					</h2>
					<p className="text-gray-400 mt-1">Gestión de categorías</p>
				</div>
				<AddCategory />
			</CardHeader>
			<Separator />
			<CardContent className="p-0">
				<DataTable columns={columns} data={categories} />
			</CardContent>
		</Card>
	);
};
