'use client';

import { useFormSubmit } from '@/hooks/use-form-submit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getCategories } from '@/actions/categories';
import { getWallets } from '@/actions/wallets';

import { SubmitButton } from '@/components/submit-button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	TransactionsFormSchema,
	transactionsSchema,
} from '@/lib/schemas/transactions';
import { toast } from 'sonner';

import { TransactionWithRelations } from '@/types/transactions.types';
import type { Category, Wallet } from '@prisma/client';

interface TransactionFormProps {
	mode: 'create' | 'edit';
	transaction?: TransactionWithRelations;
	preloadedWallets?: Wallet[];
	preloadedCategories?: Category[];
	onSubmit: (values: TransactionsFormSchema) => Promise<{ success: boolean }>;
	triggerButton: React.ReactNode;
	dialogTitle: string;
	dialogDescription: string;
	submitButtonText: string;
}

export function TransactionForm({
	mode,
	transaction,
	preloadedWallets,
	preloadedCategories,
	onSubmit,
	triggerButton,
	dialogTitle,
	dialogDescription,
	submitButtonText,
}: TransactionFormProps) {
	const [open, setOpen] = useState(false);
	const [wallets, setWallets] = useState<Wallet[]>(preloadedWallets || []);
	const [categories, setCategories] = useState<Category[]>(
		preloadedCategories || []
	);
	// const [isLoading, setIsLoading] = useState(false);
	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<TransactionsFormSchema>();

	const form = useForm<TransactionsFormSchema>({
		resolver: zodResolver(transactionsSchema),
		defaultValues: {
			type: (transaction?.type as 'Gasto' | 'Ingreso') || 'Gasto',
			date: transaction?.date ? new Date(transaction.date) : new Date(),
			amount: transaction?.amount || 0,
			description: transaction?.description || '',
			walletId: transaction?.walletId || undefined,
			categoryId: transaction?.categoryId || undefined,
		},
	});

	// Load wallets and categories when dialog opens if not preloaded
	useEffect(() => {
		if (open && (!preloadedWallets || !preloadedCategories)) {
			loadData();
		}
	}, [open, preloadedWallets, preloadedCategories]);

	// Filter categories based on transaction type
	const filteredCategories = categories.filter(
		(category) => category.type === form.watch('type')
	);

	// Reset categoryId when type changes
	useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if (name === 'type') {
				form.setValue('categoryId', undefined);
			}
		});
		return () => subscription.unsubscribe();
	}, [form]);

	async function loadData() {
		// setIsLoading(true);
		try {
			// Load wallets if not preloaded
			if (!preloadedWallets) {
				const walletsResponse = await getWallets();
				if (walletsResponse.success && 'data' in walletsResponse) {
					setWallets(walletsResponse.data);
				}
			}

			// Load categories if not preloaded
			if (!preloadedCategories) {
				const categoriesResponse = await getCategories();
				if (categoriesResponse.success && 'data' in categoriesResponse) {
					setCategories(categoriesResponse.data);
				}
			}
		} catch (error) {
			console.error('Error loading data:', error);
			toast.error('Error al cargar los datos');
		} finally {
			// setIsLoading(false);
		}
	}

	async function handleSubmit(values: TransactionsFormSchema) {
		const success = await submitWithState(values, onSubmit, {
			successMessage: `Transacción ${
				mode === 'create' ? 'creada' : 'actualizada'
			} correctamente`,
			errorMessage: `Error al ${
				mode === 'create' ? 'crear' : 'actualizar'
			} la transacción`,
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
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription>{dialogDescription}</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4 mt-4">
						<div className="flex gap-5">
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem className="flex-1/3 relative">
										<FormLabel>Tipo</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl className="w-full">
												<SelectTrigger>
													<SelectValue placeholder="Selecciona un tipo" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Gasto">Gasto</SelectItem>
												<SelectItem value="Ingreso">Ingreso</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="flex-1/3 relative">
										<FormLabel>Fecha</FormLabel>
										<FormControl>
											<Input
												type="date"
												value={
													field.value instanceof Date
														? field.value.toISOString().split('T')[0]
														: typeof field.value === 'string' &&
														  field.value !== ''
														? field.value
														: ''
												}
												onChange={(e) => {
													if (!e.target.value) {
														field.onChange(undefined);
													} else {
														field.onChange(new Date(e.target.value));
													}
												}}
											/>
										</FormControl>
										<FormMessage className="absolute -bottom-6 left-0" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem className="flex-1/3 relative">
										<FormLabel>Cantidad</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="0.00"
												step="0.01"
												{...field}
											/>
										</FormControl>
										<FormMessage className="absolute -bottom-6 left-0" />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Input
											placeholder="Descripción de la transacción"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-between gap-5">
							<FormField
								control={form.control}
								name="walletId"
								render={({ field }) => (
									<FormItem className="flex-1/2">
										<FormLabel>Cartera</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
											defaultValue={field.value?.toString()}>
											<FormControl className="w-full">
												<SelectTrigger>
													<SelectValue placeholder="Selecciona una cartera" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{wallets.map((wallet) => (
													<SelectItem
														key={wallet.id}
														value={wallet.id.toString()}>
														{wallet.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem className="flex-1/2">
										<FormLabel>Categoría</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
											defaultValue={field.value?.toString()}>
											<FormControl className="w-full">
												<SelectTrigger>
													<SelectValue placeholder="Selecciona una categoría" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{filteredCategories.map((category) => (
													<SelectItem
														key={category.id}
														value={category.id.toString()}>
														{category.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<SubmitButton isSubmitting={isSubmitting} className="w-full">
							{submitButtonText}
						</SubmitButton>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
