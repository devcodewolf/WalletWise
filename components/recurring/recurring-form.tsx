'use client'

import { useFormSubmit } from '@/hooks/use-form-submit'
import { RecurringFormSchema, recurringSchema } from '@/lib/schemas/recurring'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getCategories } from '@/actions/categories'
import { getWallets } from '@/actions/wallets'

import { SubmitButton } from '@/components/submit-button'
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import { RecurringTransactionWithRelations } from '@/types/transactions.types'
import type { Category, Wallet } from '@prisma/client'
import { toast } from 'sonner'

interface RecurringFormProps {
	mode: 'create' | 'edit'
	recurring?: RecurringTransactionWithRelations
	onSubmit: (values: RecurringFormSchema) => Promise<{ success: boolean }>
	triggerButton: React.ReactNode
	dialogTitle: string
	dialogDescription: string
	submitButtonText: string
}

export function RecurringForm({
	mode,
	recurring,
	onSubmit,
	triggerButton,
	dialogTitle,
	dialogDescription,
	submitButtonText,
}: RecurringFormProps) {
	const [open, setOpen] = useState(false)
	const [wallets, setWallets] = useState<Wallet[]>([])
	const [categories, setCategories] = useState<Category[]>([])

	const form = useForm<RecurringFormSchema>({
		resolver: zodResolver(recurringSchema),
		defaultValues: {
			type: (recurring?.type as 'Gasto' | 'Ingreso') || 'Gasto',
			amount: recurring?.amount || 0,
			description: recurring?.description || '',
			frequency: (recurring?.frequency as 'MONTHLY' | 'YEARLY') || 'MONTHLY',
			dayOfMonth: recurring?.dayOfMonth || 1,
			walletId: recurring?.walletId || undefined,
			categoryId: recurring?.categoryId || undefined,
			isActive: recurring?.isActive ?? true,
		},
	})

	const loadData = useCallback(async () => {
		try {
			const [walletsResponse, categoriesResponse] = await Promise.all([
				getWallets(),
				getCategories(),
			])

			if (walletsResponse.success && 'data' in walletsResponse) {
				setWallets(walletsResponse.data)
			}

			if (categoriesResponse.success && 'data' in categoriesResponse) {
				setCategories(categoriesResponse.data)
			}
		} catch (error) {
			console.error('Error loading data:', error)
			toast.error('Error al cargar los datos')
		}
	}, [])

	useEffect(() => {
		if (open) {
			loadData()
		}
	}, [open, loadData])

	// Filter categories based on transaction type
	const filteredCategories = categories.filter(
		(category: Category) => category.type === form.watch('type')
	)

	// Reset categoryId when type changes
	useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if (name === 'type') {
				form.setValue('categoryId', undefined)
			}
		})
		return () => subscription.unsubscribe()
	}, [form])

	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<RecurringFormSchema>()

	async function handleSubmit(values: RecurringFormSchema) {
		const success = await submitWithState(values, onSubmit, {
			successMessage: `Recurrencia ${
				mode === 'create' ? 'creada' : 'editada'
			} correctamente`,
			errorMessage: `Error al ${
				mode === 'create' ? 'crear' : 'editar'
			} la recurrencia`,
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
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription>{dialogDescription}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Tipo' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Gasto'>Gasto</SelectItem>
												<SelectItem value='Ingreso'>Ingreso</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='amount'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Monto</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='0.00'
												step='0.01'
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
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Input placeholder='Ej: Netflix, Nómina, etc.' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='frequency'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Frecuencia</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Frecuencia' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='MONTHLY'>Mensual</SelectItem>
												<SelectItem value='YEARLY'>Anual</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='dayOfMonth'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Día del mes</FormLabel>
										<FormControl>
											<Input
												type='number'
												min={1}
												max={31}
												placeholder='1-31'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='walletId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cartera (Opcional)</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
											value={field.value?.toString()}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Selecciona' />
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
								name='categoryId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Categoría (Opcional)</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
											value={field.value?.toString()}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Selecciona' />
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

						<FormField
							control={form.control}
							name='isActive'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
									<div className='space-y-0.5'>
										<FormLabel>Estado Activo</FormLabel>
										<p className='text-xs text-muted-foreground'>
											Las reglas inactivas no generarán alertas
										</p>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
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
