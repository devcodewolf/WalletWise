'use client';

import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Wallet } from '@prisma/client';
import { updateWallet } from '@/actions/wallets';
import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { WalletsFormSchema, walletsSchema } from '@/lib/schemas/wallets';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface EditWalletProps {
	wallet: Wallet;
}

export function EditWallet({ wallet }: EditWalletProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<WalletsFormSchema>({
		resolver: zodResolver(walletsSchema),
		defaultValues: {
			name: wallet.name,
			initialBalance: wallet.initialBalance,
		},
	});

	async function onSubmit(values: WalletsFormSchema) {
		const result = await updateWallet(wallet.id, values);

		if (!result.success) {
			toast.error((result as { error?: string }).error);
			return;
		}

		toast.success('Cartera editada con éxito');
		setOpen(false);
		router.refresh();
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
				<Edit className="h-4 w-4" />
			</Button>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar Cartera</DialogTitle>
					<DialogDescription>
						Modifica los detalles de tu cartera aquí.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input placeholder="Nombre de la cartera" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="initialBalance"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Saldo Inicial</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="0.00"
											step="0.01"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Guardar Cambios</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
