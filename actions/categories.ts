'use server';

import { db } from '@/lib/db';
import { createCategorySchema } from '@/lib/zod';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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
export async function createCategory(
	values: z.infer<typeof createCategorySchema>
) {
	const validateFields = createCategorySchema.safeParse(values);
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
export async function updateCategory(
	id: number,
	data: {
		name?: string;
		type?: string;
		iconName?: string;
		color?: string;
	}
) {
	try {
		const category = await db.category.update({
			where: { id },
			data,
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
		return { success: false, error: 'Failed to delete category' };
	}
}
