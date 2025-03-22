'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteCategory } from '@/actions/categories';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface DeleteCategoryProps {
	category: Category;
}

export function DeleteCategory({ category }: DeleteCategoryProps) {
	const router = useRouter();

	const handleDelete = async () => {
		try {
			const response = await deleteCategory(category.id);

			if (!response.success) {
				toast.error(
					response.error || 'Ha ocurrido un error al borrar la categoría'
				);
				return;
			}

			toast.success(`Categoría ${category.name} borrada correctamente`);
			router.refresh();
		} catch (error) {
			console.error(`Error al borrar categoría:`, error);
			toast.error(`Ha ocurrido un error al borrar la categoría`);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" size="sm">
					<Trash2 className="h-4 w-4 text-red-500" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Borrar categoria</AlertDialogTitle>
					<AlertDialogDescription>
						¿Estás seguro de que quieres borrar la categoria "{category.name}"?
						Esta acción no se puede deshacer.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-red-500 hover:bg-red-600">
						Borrar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
