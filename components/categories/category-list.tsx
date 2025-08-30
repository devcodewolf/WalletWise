import { DataTable } from '@/components/ui/data-table';
import { columns } from './categoryColumns';
import { getCategories } from '@/actions/categories';

interface CategoryListProps {
	limitShow?: number;
}

export const CategoryList = async ({ limitShow }: CategoryListProps) => {
	const respCategories = await getCategories();

	const categories =
		respCategories.success && 'data' in respCategories
			? respCategories.data
			: [];

	return (
		<DataTable columns={columns} data={categories} limitShow={limitShow} />
	);
};
