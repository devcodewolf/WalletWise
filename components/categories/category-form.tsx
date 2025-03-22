'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategorySchema } from '@/lib/zod';

import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type FormValues = z.infer<typeof createCategorySchema>;

interface CategoryFormProps {
	mode: 'create' | 'edit';
	category?: Category;
	onSubmit: (values: FormValues) => Promise<{ success: boolean }>;
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
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(createCategorySchema),
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

	async function handleSubmit(values: FormValues) {
		try {
			const response = await onSubmit(values);

			if (!response.success) {
				toast(
					`Ha ocurrido un error al ${
						mode === 'create' ? 'crear' : 'editar'
					} la categoría`
				);
				return;
			}

			setOpen(false);
			form.reset();
			toast(
				`Categoría ${mode === 'create' ? 'creada' : 'editada'} correctamente`
			);
			setTimeout(() => {
				router.refresh();
			}, 300);
		} catch (error) {
			console.error(
				`Error al ${mode === 'create' ? 'crear' : 'editar'} categoría:`,
				error
			);
			toast('Ha ocurrido un error inesperado');
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
									<FormLabel>Type</FormLabel>
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
							<Button type="submit">{submitButtonText}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
