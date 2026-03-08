'use client'

import { CategoryFormValues, categorySchema } from '@/lib/schemas/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { Category } from '@prisma/client'
import { useEffect, useState } from 'react'
import { IconSelector } from './icon-selector'
import { PRESET_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface CategoryFormProps {
	mode: 'create' | 'edit'
	category?: Category
	onSubmit: (values: CategoryFormValues) => Promise<{ success: boolean }>
	triggerButton: React.ReactNode
	dialogTitle: string
	dialogDescription: string
	submitButtonText: string
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
	const [open, setOpen] = useState(false)
	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<CategoryFormValues>()

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: category?.name || '',
			type: (category?.type as 'Gasto' | 'Ingreso') || 'Gasto',
			iconName: category?.iconName || 'ShoppingBag',
			color: category?.color || '#fff',
		},
	})

	useEffect(() => {
		if (category) {
			form.reset({
				name: category.name,
				type: category.type as 'Gasto' | 'Ingreso',
				iconName: category.iconName,
				color: category.color,
			})
		}
	}, [category, form])

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
		})

		if (success) {
			form.reset()
			setOpen(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription>{dialogDescription}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input placeholder='Nombre categoría' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<FormControl>
										<div className='flex gap-4'>
											<Button
												type='button'
												variant={
													field.value === 'Gasto' ? 'default' : 'outline'
												}
												className='flex-1'
												onClick={() => field.onChange('Gasto')}>
												Gasto
											</Button>
											<Button
												type='button'
												variant={
													field.value === 'Ingreso' ? 'default' : 'outline'
												}
												className='flex-1'
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
							name='iconName'
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

						{/* Color */}
						<FormField
							control={form.control}
							name='color'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Selecciona un color</FormLabel>
									<FormControl>
										<div className='space-y-3'>
											{/* Colores predefinidos */}
											<div className='flex flex-wrap gap-3'>
												{PRESET_COLORS.map((c) => (
													<button
														key={c}
														type='button'
														title={c}
														onClick={() => field.onChange(c)}
														className={cn(
															'w-7 h-7 rounded-full transition-all duration-150 hover:scale-110 focus:outline-none',
															field.value === c
																? 'ring-2 ring-offset-2 ring-offset-card ring-white scale-110'
																: '',
														)}
														style={{ backgroundColor: c }}
													/>
												))}
											</div>
											{/* Color picker personalizado */}
											<FormDescription>Color seleccionado</FormDescription>
											<div className='flex items-center gap-2'>
												<div
													className='w-7 h-7 rounded-full border border-border shrink-0'
													style={{ backgroundColor: field.value }}
												/>
												<input
													type='color'
													value={field.value}
													onChange={(e) => field.onChange(e.target.value)}
													className='h-8 w-20 rounded cursor-pointer bg-transparent border border-border px-1'
													title='Color personalizado'
												/>
											</div>
										</div>
									</FormControl>
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
	)
}
