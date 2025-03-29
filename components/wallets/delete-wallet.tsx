'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Wallet } from '@prisma/client';
import { deleteWallet } from '@/actions/wallets';
import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface DeleteWalletProps {
	wallet: Wallet;
}

export function DeleteWallet({ wallet }: DeleteWalletProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	async function onDelete() {
		const result = await deleteWallet(wallet.id);
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
						cartera {wallet.name} y todos sus datos asociados.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>Eliminar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
