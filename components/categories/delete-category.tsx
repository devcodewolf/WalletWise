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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DeleteCategoryProps {
	category: Category;
}

export function DeleteCategory({ category }: DeleteCategoryProps) {
	const router = useRouter();

	const handleDelete = async () => {
		try {
			const response = await deleteCategory(category.id);

			if (!response.success) {
				toast(`Ha ocurrido un error al eliminar la categoría`);
				return;
			}

			toast(`Categoría eliminada con éxito: ${category.name}`);
			router.refresh();
		} catch (error) {
			console.error(`Error al eliminar categoría:`, error);
			toast('Ha ocurrido un error inesperado');
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
					<AlertDialogTitle>Borrar categoría</AlertDialogTitle>
					<AlertDialogDescription>
						¿Estás seguro de que quieres eliminar la categoría "{category.name}
						"? Esta acción no se puede deshacer.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-red-500 hover:bg-red-600">
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
