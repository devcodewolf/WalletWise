import { CategoryList } from '@/components/categories/category-list';
import { Category } from '@/types';

// Sample data with string icon names instead of React components

const data: Category[] = [
	{
		id: '1',
		iconName: 'ShoppingBag',
		name: 'Shopping',
		type: 'Expense',
	},
	{
		id: '2',
		iconName: 'Coffee',
		name: 'Food & Drinks',
		type: 'Expense',
	},
	{
		id: '3',
		iconName: 'Home',
		name: 'Housing',
		type: 'Expense',
	},
	{
		id: '4',
		iconName: 'Car',
		name: 'Transportation',
		type: 'Expense',
	},
	{
		id: '5',
		iconName: 'Briefcase',
		name: 'Salary',
		type: 'Income',
	},
];

export default function CategoriesPage() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
				<CategoryList data={data} />
			</div>
		</div>
	);
}
