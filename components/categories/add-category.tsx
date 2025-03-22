'use client';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createCategory } from '@/actions/categories';
import { CategoryForm } from './category-form';
import { z } from 'zod';
import { createCategorySchema } from '@/lib/zod';

type FormValues = z.infer<typeof createCategorySchema>;

export function AddCategory() {
	const handleSubmit = async (values: FormValues) => {
		const result = await createCategory(values);
		return { success: !!result.success };
	};

	return (
		<CategoryForm
			mode="create"
			onSubmit={handleSubmit}
			triggerButton={
				<Button className="ml-auto flex">
					<PlusCircle className="mr-2 h-4 w-4" />
					Nueva categoría
				</Button>
			}
			dialogTitle="Añadir nueva categoría"
			dialogDescription="Crear una nueva categoría para rastrear sus gastos o ingresos."
			submitButtonText="Crear categoría"
		/>
	);
}
