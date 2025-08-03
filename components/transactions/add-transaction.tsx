'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { createTransaction } from '@/actions/transactions';
import { getWallets } from '@/actions/wallets';
import { getCategories } from '@/actions/categories';

import { useForm } from 'react-hook-form';
import { PlusCircle, Loader2 } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSubmit } from '@/hooks/use-form-submit';
// components ui sahdcn
import { Button } from '@/components/ui/button';
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

import type { Category, Wallet } from '@prisma/client';

export function AddTransaction() {
	const [open, setOpen] = useState(false);
	const [wallets, setWallets] = useState<Wallet[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<TransactionsFormSchema>();

	const router = useRouter();

	const form = useForm<TransactionsFormSchema>({
		resolver: zodResolver(transactionsSchema),
		defaultValues: {
			type: 'Gasto',
			date: new Date(),
			amount: 0,
			description: '',
		},
	});

	// Load wallets and categories when dialog opens
	useEffect(() => {
		if (open) {
			loadData();
		}
	}, [open]);

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
		setIsLoading(true);
		try {
			// Load wallets
			const walletsResponse = await getWallets();
			if (walletsResponse.success && 'data' in walletsResponse) {
				setWallets(walletsResponse.data);
			}

			// Load categories
			const categoriesResponse = await getCategories();
			if (categoriesResponse.success && 'data' in categoriesResponse) {
				setCategories(categoriesResponse.data);
			}
		} catch (error) {
			console.error('Error loading data:', error);
			toast.error('Error al cargar los datos');
		} finally {
			setIsLoading(false);
		}
	}

	async function handleSubmit(values: TransactionsFormSchema) {
		const success = await submitWithState(values, createTransaction, {
			successMessage: 'Transacción creada correctamente',
			errorMessage: 'Error al crear la transacción',
		});

		if (success) {
			form.reset();
			setOpen(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="ml-auto flex cursor-pointer">
					<PlusCircle className="h-4 w-4" />
					Nuevo movimiento
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nuevo movimiento</DialogTitle>
					<DialogDescription>
						Rellena los campos para crear un nuevo movimiento
					</DialogDescription>
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
							Crear movimiento
						</SubmitButton>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
