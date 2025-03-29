'use server';

import { db } from '@/lib/db';
import { CategoryFormValues, categorySchema } from '@/lib/schemas/category';

// Get all categories
export async function getCategories() {
	try {
		const categories = await db.category.findMany({
			orderBy: {
				name: 'asc',
			},
		});

		return { success: true, data: categories };
	} catch (error) {
		console.error('Error fetching categories:', error);
		return { success: false, error: 'Failed to fetch categories' };
	}
}

// Create a new category
export async function createCategory(values: CategoryFormValues) {
	const validateFields = categorySchema.safeParse(values);
	if (!validateFields.success) return { error: 'Invalid fields' };

	try {
		const category = await db.category.create({
			data: {
				...validateFields.data,
			},
		});

		return { success: true, data: category };
	} catch (error) {
		console.error('Error creating category:', error);
		return { success: false, error: 'Failed to create category' };
	}
}

// Update a category
export async function updateCategory(id: number, values: CategoryFormValues) {
	const validateFields = categorySchema.safeParse(values);
	if (!validateFields.success) return { error: 'Invalid fields' };

	try {
		const category = await db.category.update({
			where: { id },
			data: {
				...validateFields.data,
			},
		});

		return { success: true, data: category };
	} catch (error) {
		console.error('Error updating category:', error);
		return { success: false, error: 'Failed to update category' };
	}
}

// Delete a category
export async function deleteCategory(id: number) {
	try {
		await db.category.delete({
			where: { id },
		});

		return { success: true };
	} catch (error) {
		console.error('Error deleting category:', error);
		if (error instanceof Error && error.message.includes('foreign key')) {
			return {
				success: false,
				error:
					'No se puede eliminar esta categoría porque tiene transacciones asociadas.',
			};
		}
		return {
			success: false,
			error: 'Ha habido en fallo al borrar la categoría',
		};
	}
}
