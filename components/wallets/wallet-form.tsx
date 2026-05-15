'use client'

import { useFormSubmit } from '@/hooks/use-form-submit'
import { WalletsFormSchema, walletsSchema } from '@/lib/schemas/wallets'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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
import { Wallet } from '@prisma/client'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { WalletIcon } from 'lucide-react'

// Constantes de bancos para el selector
const BANKS = [
	{
		id: 'santander',
		name: 'Santander',
		image: 'banco-santander-logo.svg',
		color: '#ec0000',
	},
	{ id: 'bbva', name: 'BBVA', image: 'bbva-2.svg', color: '#072146' },
	{
		id: 'caixabank',
		name: 'Caixabank',
		image: 'caixabank-logo.svg',
		color: '#007C85',
	}, // Usaremos un color aproximado a la UI o corporativo
	{ id: 'ing', name: 'ING', image: 'ing-groep-logo.svg', color: '#ff6200' },
	{
		id: 'sabadell',
		name: 'Sabadell',
		image: 'sabadell-1.svg',
		color: '#006dff',
	},
	{
		id: 'bankinter',
		name: 'Bankinter',
		image: 'bankinter.svg',
		color: '#eb5a00',
	},
	{ id: 'abanca', name: 'Abanca', image: 'abanca-1.svg', color: '#005b8c' },
	{
		id: 'deutsche',
		name: 'Deutsche Bank',
		image: 'deutsche-bank-1.svg',
		color: '#0018a8',
	},
	{ id: 'unicaja', name: 'Unicaja', image: 'unicaja.svg', color: '#009b66' },
	{ id: 'revolut', name: 'Revolut', image: 'revolut-1.svg', color: '#1a1a1a' },
	{ id: 'other', name: 'Otro / Manual', image: null, color: '#3b82f6' }, // Color por defecto
]

interface WalletFormProps {
	mode: 'create' | 'edit'
	wallet?: Wallet
	onSubmit: (values: WalletsFormSchema) => Promise<{ success: boolean }>
	triggerButton: React.ReactNode
	dialogTitle: string
	dialogDescription: string
	submitButtonText: string
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
	const [open, setOpen] = useState(false)
	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<WalletsFormSchema>()

	const form = useForm<WalletsFormSchema>({
		resolver: zodResolver(walletsSchema),
		defaultValues: {
			name: wallet?.name || '',
			initialBalance: mode === 'create' ? 0 : wallet?.initialBalance || 0,
			currentBalance:
				mode === 'edit' ? (wallet?.currentBalance ?? undefined) : undefined,
			color: wallet?.color || '#3b82f6',
			image: wallet?.image || null,
		},
	})

	const watchImage = form.watch('image')

	useEffect(() => {
		if (open) {
			if (mode === 'edit' && wallet) {
				form.reset({
					name: wallet.name,
					initialBalance: parseFloat(wallet.initialBalance.toFixed(2)),
					currentBalance: parseFloat(wallet.currentBalance.toFixed(2)),
					color: wallet.color || '#3b82f6',
					image: wallet.image,
				})
			} else if (mode === 'create') {
				form.reset({
					name: '',
					initialBalance: 0,
					currentBalance: undefined,
					color: '#3b82f6',
					image: null,
				})
			}
		}
	}, [mode, wallet, form, open])

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
		})

		if (success) {
			form.reset()
			setOpen(false)
		}
	}

	const handleBankSelect = (bank: (typeof BANKS)[0]) => {
		form.setValue('image', bank.image, { shouldValidate: true })
		if (bank.id !== 'other' || mode === 'create') {
			form.setValue('color', bank.color, { shouldValidate: true })
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			<DialogContent className='sm:max-w-xl p-8 pt-10 overflow-hidden'>
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription>{dialogDescription}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-4 max-h-[70vh] overflow-y-auto px-1'>
						{/* Selector de Banco / Imagen */}
						<div className='space-y-3 pt-2'>
							<FormLabel>Entidad</FormLabel>
							<div className='grid grid-cols-4 sm:grid-cols-4 gap-2'>
								{BANKS.map((bank) => {
									// Tratamos null igual
									const isSelected =
										watchImage === bank.image &&
										(bank.image !== null || watchImage === null)
									return (
										<button
											key={bank.id}
											type='button'
											onClick={() => handleBankSelect(bank)}
											className={cn(
												'flex flex-col items-center bg-white justify-center p-2 rounded-xl border-2 transition-all  hover:scale-105 hover:opacity-100 duration-300 h-16',
												isSelected
													? 'border-primary ring-2 ring-primary/20 opacity-100'
													: 'border-border opacity-70',
											)}>
											{bank.image ? (
												<div className='relative w-full h-8 flex items-center justify-center dark:rounded-[4px] dark:px-1'>
													<Image
														src={`/img/banks/${bank.image}`}
														alt={bank.name}
														fill
														className='object-contain p-1'
													/>
												</div>
											) : (
												<div className='flex items-center justify-center h-8'>
													<WalletIcon className='size-6 text-muted-foreground' />
												</div>
											)}
										</button>
									)
								})}
							</div>
						</div>

						{/* Mostrar color picker si es Otro o si quiere modificar el del banco */}
						<FormField
							control={form.control}
							name='color'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color identificativo</FormLabel>
									<div className='flex gap-3 items-center'>
										<FormControl>
											<input
												type='color'
												value={field.value || '#3b82f6'}
												onChange={(e) => field.onChange(e.target.value)}
												className='h-10 w-14 rounded-md cursor-pointer border-0 bg-transparent p-0 flex-shrink-0'
											/>
										</FormControl>
										<Input
											value={field.value || '#3b82f6'}
											onChange={field.onChange}
											placeholder='#HexColor'
											className='font-mono uppercase uppercase-text'
											maxLength={7}
										/>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre de la cuenta</FormLabel>
									<FormControl>
										<Input
											placeholder='Ej. Cuenta Corriente Principal'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='initialBalance'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Saldo Inicial</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='0.00'
											step='0.01'
											value={field.value ?? ''}
											onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
											onBlur={field.onBlur}
											name={field.name}
											ref={field.ref}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{mode === 'edit' && (
							<FormField
								control={form.control}
								name='currentBalance'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Saldo Actual</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='0.00'
												step='0.01'
												value={field.value ?? ''}
												onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
												onBlur={field.onBlur}
												name={field.name}
												ref={field.ref}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<DialogFooter className='pt-4 pb-2'>
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
