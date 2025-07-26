'use client';

import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Category, Wallet } from '@prisma/client';
import { updateTransaction } from '@/actions/transactions';
import { useState, useEffect } from 'react';
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
import {
	TransactionsFormSchema,
	transactionsSchema,
} from '@/lib/schemas/transactions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { TransactionWithRelations } from '@/types/transactions.types';

type EditTransactionProps = {
	transaction: TransactionWithRelations;
	wallets: Wallet[];
	categories: Category[];
};

export function EditTransaction({
	transaction,
	wallets,
	categories,
}: EditTransactionProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<TransactionsFormSchema>({
		resolver: zodResolver(transactionsSchema),
		defaultValues: {
			type: transaction.type as 'Gasto' | 'Ingreso',
			date: new Date(transaction.date),
			amount: transaction.amount,
			description: transaction.description || '',
			walletId: transaction.walletId || undefined,
			categoryId: transaction.categoryId || undefined,
		},
	});

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

	async function onSubmit(values: TransactionsFormSchema) {
		const result = await updateTransaction(transaction.id, values);

		console.log('result', result);
		if (!result.success) {
			return toast.error((result as { error?: string }).error);
		}

		toast.success('Transacción actualizada correctamente');
		setOpen(false);
		setTimeout(() => {
			router.refresh();
		}, 300);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
				<Edit className="h-4 w-4" />
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Transacción</DialogTitle>
					<DialogDescription>
						Actualiza los detalles de la transacción
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="flex gap-5">
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
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
									<FormItem>
										<FormLabel>Fecha</FormLabel>
										<FormControl>
											<Input
												type="date"
												value={
													field.value instanceof Date
														? field.value.toISOString().split('T')[0]
														: ''
												}
												onChange={(e) => {
													field.onChange(new Date(e.target.value));
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Monto</FormLabel>
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

						<div className="flex gap-5">
							<FormField
								control={form.control}
								name="walletId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cartera</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
											defaultValue={field.value?.toString()}>
											<FormControl>
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
									<FormItem>
										<FormLabel>Categoría</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
											defaultValue={field.value?.toString()}>
											<FormControl>
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

						<Button type="submit" className="w-full">
							Actualizar
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
