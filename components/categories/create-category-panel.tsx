'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryFormValues, categorySchema } from '@/lib/schemas/category'
import { createCategory } from '@/actions/categories'
import { useFormSubmit } from '@/hooks/use-form-submit'
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
import { Button } from '@/components/ui/button'
import { SubmitButton } from '@/components/submit-button'
import { IconSelector } from './icon-selector'
import { cn } from '@/lib/utils'
import { PRESET_COLORS } from '@/lib/constants'

export function CreateCategoryPanel() {
	const router = useRouter()
	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<CategoryFormValues>()

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			type: 'Gasto',
			iconName: 'ShoppingBag',
			color: '#ef4444',
		},
	})

	const selectedColor = form.watch('color')

	async function handleSubmit(values: CategoryFormValues) {
		const result = await createCategory(values)
		const success = !!result.success

		await submitWithState(values, async () => ({ success }), {
			successMessage: 'Categoría creada correctamente',
			errorMessage: 'Ha ocurrido un error al crear la categoría',
			resetForm: true,
		})

		if (success) {
			form.reset()
			setTimeout(() => router.refresh(), 150)
		}
	}

	return (
		<div className='rounded-xl border border-border bg-card p-5 space-y-5'>
			<h2 className='text-lg font-bold'>Crear nueva categoría</h2>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
					{/* Nombre */}
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='mb-1 text-muted-foreground font-medium'>
									Nombre
								</FormLabel>
								<FormControl>
									<Input placeholder='Nombre categoría' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Tipo */}
					<FormField
						control={form.control}
						name='type'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='mb-1 text-muted-foreground font-medium'>
									Tipo
								</FormLabel>
								<FormControl>
									<div className='flex gap-2'>
										<Button
											type='button'
											variant={
												field.value === 'Gasto' ? 'default' : 'secondary'
											}
											className='flex-1'
											onClick={() => field.onChange('Gasto')}>
											Gasto
										</Button>
										<Button
											type='button'
											variant={
												field.value === 'Ingreso' ? 'default' : 'secondary'
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

					{/* Icono */}
					<FormField
						control={form.control}
						name='iconName'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='mb-1 text-muted-foreground font-medium'>
									Icono
								</FormLabel>
								<FormControl>
									<IconSelector
										selectedIcon={field.value}
										onSelectIcon={field.onChange}
										color={selectedColor}
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
								<FormLabel className='mb-1 text-muted-foreground font-medium'>
									Selecciona un color
								</FormLabel>
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
										<FormDescription className='mb-1'>
											Color seleccionado
										</FormDescription>
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

					<SubmitButton isSubmitting={isSubmitting} className='w-full'>
						Crear categoría
					</SubmitButton>
				</form>
			</Form>
		</div>
	)
}
