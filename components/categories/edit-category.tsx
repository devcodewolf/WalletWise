'use client';

import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category } from '@prisma/client';
import { updateCategory } from '@/actions/categories';
import { CategoryForm } from './category-form';
import { createCategorySchema } from '@/lib/zod';
import { z } from 'zod';

interface EditCategoryProps {
	category: Category;
}
type FormValues = z.infer<typeof createCategorySchema>;

export function EditCategory({ category }: EditCategoryProps) {
	const handleSubmit = async (values: FormValues) => {
		return await updateCategory(category.id, values);
	};

	return (
		<CategoryForm
			mode="edit"
			category={category}
			onSubmit={handleSubmit}
			triggerButton={
				<Button variant="ghost" size="sm">
					<Edit className="h-4 w-4" />
				</Button>
			}
			dialogTitle="Editar Categoria"
			dialogDescription="Modifica los detalles de esta categoria."
			submitButtonText="Actualizar"
		/>
	);
}
