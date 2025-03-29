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

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
				<CategoryList data={categories} />
			</div>
		</div>
	);
}
