'use server';

import { db } from '@/lib/db';
import { CategoryFormValues, categorySchema } from '@/lib/schemas/category';
import { requireAuth } from '@/lib/auth-utils';

// Get all categories for the current user
export async function getCategories() {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		const categories = await db.category.findMany({
			where: {
				userId: Number(authResult.user!.id),
			},
			orderBy: {
				name: 'desc',
			},
		});

		return { success: true, data: categories };
	} catch (error) {
		console.error('Error fetching categories:', error);
		return { success: false, error: 'Error al obtener las categorías' };
	}
}

// Create a new category for the current user
export async function createCategory(values: CategoryFormValues) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		const validateFields = categorySchema.safeParse(values);
		if (!validateFields.success) {
			return { success: false, error: 'Hay campos vacíos o no válidos' };
		}

		const category = await db.category.create({
			data: {
				...validateFields.data,
				userId: Number(authResult.user!.id),
			},
		});

		return { success: true, data: category };
	} catch (error) {
		console.error('Error creating category:', error);
		return { success: false, error: 'Error al crear la categoría' };
	}
}

// Update a category for the current user
export async function updateCategory(id: number, values: CategoryFormValues) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		// First check if the category belongs to the current user
		const existingCategory = await db.category.findFirst({
			where: {
				id,
				userId: Number(authResult.user!.id),
			},
		});

		if (!existingCategory) {
			return {
				success: false,
				error: 'Categoría no encontrada o no autorizada',
			};
		}

		const validateFields = categorySchema.safeParse(values);
		if (!validateFields.success) {
			return { success: false, error: 'Hay campos vacíos o no válidos' };
		}

		const category = await db.category.update({
			where: { id },
			data: {
				...validateFields.data,
			},
		});

		return { success: true, data: category };
	} catch (error) {
		console.error('Error updating category:', error);
		return { success: false, error: 'Error al actualizar la categoría' };
	}
}

// Delete a category for the current user
export async function deleteCategory(id: number) {
	try {
		const authResult = await requireAuth();
		if (!authResult.success) {
			return authResult;
		}

		// First check if the category belongs to the current user
		const existingCategory = await db.category.findFirst({
			where: {
				id,
				userId: Number(authResult.user!.id),
			},
		});

		if (!existingCategory) {
			return {
				success: false,
				error: 'Categoría no encontrada o no autorizada',
			};
		}

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
			error: 'Ha habido un fallo al borrar la categoría',
		};
	}
}
