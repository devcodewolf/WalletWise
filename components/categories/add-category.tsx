'use client';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createCategory } from '@/actions/categories';
import { CategoryForm } from './category-form';
import { CategoryFormValues } from '@/lib/schemas/category';

export function AddCategory() {
	const handleSubmit = async (values: CategoryFormValues) => {
		const result = await createCategory(values);
		return { success: !!result.success }; //to respect the return type of the onSubmit function
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
