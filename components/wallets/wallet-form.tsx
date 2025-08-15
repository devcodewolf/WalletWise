'use client';

import { useFormSubmit } from '@/hooks/use-form-submit';
import { WalletsFormSchema, walletsSchema } from '@/lib/schemas/wallets';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SubmitButton } from '@/components/submit-button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Wallet } from '@prisma/client';

interface WalletFormProps {
	mode: 'create' | 'edit';
	wallet?: Wallet;
	onSubmit: (values: WalletsFormSchema) => Promise<{ success: boolean }>;
	triggerButton: React.ReactNode;
	dialogTitle: string;
	dialogDescription: string;
	submitButtonText: string;
}

export function WalletForm({
	mode,
	wallet,
	onSubmit,
	triggerButton,
	dialogTitle,
	dialogDescription,
	submitButtonText,
}: WalletFormProps) {
	const [open, setOpen] = useState(false);
	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<WalletsFormSchema>();

	const form = useForm<WalletsFormSchema>({
		resolver: zodResolver(walletsSchema),
		defaultValues: {
			name: wallet?.name || '',
			// En modo creación, forzamos 0 para evitar valores por defecto no deseados (p.ej. 5000)
			initialBalance: mode === 'create' ? 0 : wallet?.initialBalance || 0,
			currentBalance:
				mode === 'edit' ? wallet?.currentBalance ?? undefined : undefined,
		},
	});

	useEffect(() => {
		if (mode === 'edit' && wallet) {
			form.reset({
				name: wallet.name,
				initialBalance: wallet.initialBalance,
				currentBalance: wallet.currentBalance,
			});
		} else if (mode === 'create') {
			form.reset({
				name: '',
				initialBalance: 0,
				currentBalance: undefined,
			});
		}
	}, [mode, wallet, form]);

	async function handleSubmit(values: WalletsFormSchema) {
		const success = await submitWithState(values, onSubmit, {
			successMessage: `Cartera ${
				mode === 'create' ? 'creada' : 'editada'
			} con éxito`,
			errorMessage: `Error al ${
				mode === 'create' ? 'crear' : 'editar'
			} la cartera`,
			resetForm: true,
			closeDialog: true,
		});

		if (success) {
			form.reset();
			setOpen(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription>{dialogDescription}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4">
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
						{mode === 'edit' && (
							<FormField
								control={form.control}
								name="currentBalance"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Saldo Actual</FormLabel>
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
						)}
						<DialogFooter>
							<SubmitButton isSubmitting={isSubmitting}>
								{submitButtonText}
							</SubmitButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
