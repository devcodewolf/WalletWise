'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTransaction } from '@/actions/transactions';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import type { TransactionWithRelations } from '@/types/transactions.types';

type DeleteTransactionProps = {
	transaction: TransactionWithRelations;
};

export function DeleteTransaction({ transaction }: DeleteTransactionProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	async function onDelete() {
		const result = await deleteTransaction(transaction.id);
		if (!result.success) {
			return toast.error((result as { error?: string }).error);
		}
		setOpen(false);
		setTimeout(() => {
			router.refresh();
		}, 300);
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
				<Trash2 className="h-4 w-4 text-red-500" />
			</Button>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se puede deshacer. Se eliminará permanentemente la
						transacción {transaction.description || `de ${transaction.amount}€`}{' '}
						y todos sus datos asociados.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={onDelete}
						className="bg-red-500 hover:bg-red-600">
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
