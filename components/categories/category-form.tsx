'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryFormValues, categorySchema } from '@/lib/schemas/category';

import { Button } from '@/components/ui/button';
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Category } from '@prisma/client';
import { IconSelector } from './icon-selector';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { Loader2Icon } from 'lucide-react';

interface CategoryFormProps {
	mode: 'create' | 'edit';
	category?: Category;
	onSubmit: (values: CategoryFormValues) => Promise<{ success: boolean }>;
	triggerButton: React.ReactNode;
	dialogTitle: string;
	dialogDescription: string;
	submitButtonText: string;
}

export function CategoryForm({
	mode,
	category,
	onSubmit,
	triggerButton,
	dialogTitle,
	dialogDescription,
	submitButtonText,
}: CategoryFormProps) {
	const [open, setOpen] = useState(false);
	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<CategoryFormValues>();

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: category?.name || '',
			type: (category?.type as 'Gasto' | 'Ingreso') || 'Gasto',
			iconName: category?.iconName || 'ShoppingBag',
			color: category?.color || '#fff',
		},
	});

	useEffect(() => {
		if (category) {
			form.reset({
				name: category.name,
				type: category.type as 'Gasto' | 'Ingreso',
				iconName: category.iconName,
				color: category.color,
			});
		}
	}, [category, form]);

	async function handleSubmit(values: CategoryFormValues) {
		const success = await submitWithState(values, onSubmit, {
			successMessage: `Categoría ${
				mode === 'create' ? 'creada' : 'editada'
			} correctamente`,
			errorMessage: `Ha ocurrido un error al ${
				mode === 'create' ? 'crear' : 'editar'
			} la categoría`,
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
										<Input placeholder="Nombre categoría" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<FormControl>
										<div className="flex gap-4">
											<Button
												type="button"
												variant={
													field.value === 'Gasto' ? 'default' : 'outline'
												}
												className="flex-1"
												onClick={() => field.onChange('Gasto')}>
												Gasto
											</Button>
											<Button
												type="button"
												variant={
													field.value === 'Ingreso' ? 'default' : 'outline'
												}
												className="flex-1"
												onClick={() => field.onChange('Ingreso')}>
												Ingreso
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="iconName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icono</FormLabel>
									<FormControl>
										<IconSelector
											selectedIcon={field.value}
											onSelectIcon={field.onChange}
											color={'#fff'}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="color"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color</FormLabel>
									<FormControl>
										<Input type="color" {...field} className="h-10 w-18" />
									</FormControl>
									<FormDescription>
										Selecciona un color para el icono de la categoría
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
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
