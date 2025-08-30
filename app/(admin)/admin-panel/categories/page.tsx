import { CategoryList } from '@/components/categories/category-list';

import { Card } from '@/components/ui/card';
import HeaderCategory from '@/components/categories/header-category';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { TableListSkeleton } from '@/components/table-list-skeleton';

// Forzar el renderizado dinámico de la página
// export const dynamic = 'force-dynamic';

export default function CategoriesPage() {
	return (
		<Card className="p-6 gap-4">
			<HeaderCategory />
			<Separator />
			{/* category */}
			<Suspense fallback={<TableListSkeleton />}>
				<CategoryList />
			</Suspense>
		</Card>
	);
}
