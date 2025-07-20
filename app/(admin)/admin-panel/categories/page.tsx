import { CategoryList } from '@/components/categories/category-list';

import { getCategories } from '@/actions/categories';
import { Category } from '@prisma/client';

export default async function CategoriesPage() {
	const response = await getCategories();
	// console.log('getCategories', response);
	// soluciona problema de typos porque la respuesta puede ser de varios tipos union
	// y puede que no exista data
	const categories: Category[] =
		response.success && 'data' in response ? response.data : [];

	return <CategoryList data={categories} />;
}
