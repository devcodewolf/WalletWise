'use client'

import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { confirmRecurringTransactions } from '@/actions/transactions'
import { Bell, CheckCircle2, Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { RecurringTransactionWithRelations } from '@/types/transactions.types'
import { cn } from '@/lib/utils'

interface RecurringAlertClientProps {
	className?: string
	initialPending: RecurringTransactionWithRelations[]
}

export function RecurringAlertClient({
	className,
	initialPending,
}: RecurringAlertClientProps) {
	const [pending, setPending] =
		useState<RecurringTransactionWithRelations[]>(initialPending)
	const [isOpen, setIsOpen] = useState(false)
	const [submitting, setSubmitting] = useState<number | 'all' | null>(null)
	const [amounts, setAmounts] = useState<{ [key: number]: number }>(() => {
		const initialAmounts: { [key: number]: number } = {}
		initialPending.forEach((item) => {
			initialAmounts[item.id] = item.amount
		})
		return initialAmounts
	})
	const [confirmedCount, setConfirmedCount] = useState(0)
	const router = useRouter()

	const handleAmountChange = (id: number, val: string) => {
		setAmounts((prev) => ({ ...prev, [id]: parseFloat(val) || 0 }))
	}

	const getScheduledDate = (dayOfMonth: number) => {
		const now = new Date()
		const year = now.getFullYear()
		const month = now.getMonth()
		const lastDayOfMonth = new Date(year, month + 1, 0).getDate()
		const effectiveDay = Math.min(dayOfMonth, lastDayOfMonth)
		// Configurar a las 12 PM para evitar problemas de zona horaria
		return new Date(year, month, effectiveDay, 12, 0, 0)
	}

	const handleDialogChange = (open: boolean) => {
		setIsOpen(open)
		if (!open && confirmedCount > 0) {
			router.refresh()
			setConfirmedCount(0)
		}
	}

	async function handleConfirmSingle(item: RecurringTransactionWithRelations) {
		setSubmitting(item.id)
		try {
			const itemsToConfirm = [
				{
					recurringTransactionId: item.id,
					amount: amounts[item.id],
					date: getScheduledDate(item.dayOfMonth),
				},
			]

			const res = await confirmRecurringTransactions(itemsToConfirm)
			if (res.success) {
				toast.success(`${item.description} agregada correctamente`)
				setPending((prev) => prev.filter((p) => p.id !== item.id))
				setConfirmedCount((prev) => prev + 1)
				if (pending.length === 1) {
					setIsOpen(false)
					router.refresh()
					setConfirmedCount(0)
				}
			} else {
				toast.error((res as { error?: string }).error || 'Error al procesar')
			}
		} catch (err) {
			console.error('Error confirming transaction:', err)
			toast.error('Error inesperado')
		} finally {
			setSubmitting(null)
		}
	}

	async function handleConfirmAll() {
		setSubmitting('all')
		try {
			const itemsToConfirm = pending.map((p) => ({
				recurringTransactionId: p.id,
				amount: amounts[p.id],
				date: getScheduledDate(p.dayOfMonth),
			}))

			const res = await confirmRecurringTransactions(itemsToConfirm)
			if (res.success) {
				toast.success('Transacciones procesadas correctamente')
				setIsOpen(false)
				setPending([])
				router.refresh()
			} else {
				toast.error((res as { error?: string }).error || 'Error al procesar')
			}
		} catch (err) {
			console.error('Error confirming transactions:', err)
			toast.error('Error inesperado')
		} finally {
			setSubmitting(null)
		}
	}

	if (pending.length === 0) return null

	return (
		<div className={cn('flex-1 @container', className)}>
			<Alert className='bg-primary/5 border-primary/20 flex flex-col items-center gap-4 py-4 text-center @md:flex-row @md:justify-between @md:text-left @md:gap-0'>
				<div className='flex flex-col items-center gap-3 @md:flex-row'>
					<div className='bg-primary/10 p-2 rounded-full shrink-0'>
						<Bell className='h-5 w-5 text-primary' />
					</div>
					<div>
						<AlertTitle className='text-primary font-bold'>
							Movimientos recurrentes pendientes
						</AlertTitle>
						<AlertDescription className='text-sm'>
							Tienes {pending.length} transacciones programadas para este mes
							que aún no has registrado.
						</AlertDescription>
					</div>
				</div>

				<Dialog open={isOpen} onOpenChange={handleDialogChange}>
					<DialogTrigger asChild>
						<Button
							variant='default'
							size='sm'
							className='w-full @md:w-auto @md:ml-4'>
							Revisar
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[600px]'>
						<DialogHeader>
							<DialogTitle>Transacciones Recurrentes</DialogTitle>
							<DialogDescription>
								Revisa los montos antes de incorporarlos a tu historial. Puedes
								editarlos si este mes han variado.
							</DialogDescription>
						</DialogHeader>

						<div className='space-y-3  max-h-[400px] overflow-y-auto pr-2'>
							{pending.map((item) => (
								<div
									key={item.id}
									className='flex items-center justify-between gap-3'>
									<div className='p-3 rounded-lg border bg-accent/5 flex items-center justify-between gap-3 flex-1 min-w-0'>
										<div className=''>
											<p className='font-medium text-sm truncate'>
												{item.description}
											</p>
											<p className='text-xs text-muted-foreground italic'>
												{item.category?.name} • {item.wallet?.name} •{' '}
												{getScheduledDate(item.dayOfMonth).toLocaleDateString()}
											</p>
										</div>
										<div className='flex items-center gap-2'>
											<div className='w-24 flex items-center gap-1'>
												<Input
													type='number'
													step='0.01'
													value={amounts[item.id]}
													onChange={(e) =>
														handleAmountChange(item.id, e.target.value)
													}
													className='h-9 text-right'
												/>
												<span className='text-sm font-bold'>€</span>
											</div>
										</div>
									</div>
									<Button
										variant='outline'
										size='sm'
										onClick={() => handleConfirmSingle(item)}
										disabled={submitting !== null}
										className='h-9'>
										{submitting === item.id ? (
											<Loader2 className='h-4 w-4 animate-spin' />
										) : (
											<Plus className='h-4 w-4' />
										)}
									</Button>
								</div>
							))}
						</div>

						<div className='flex flex-col gap-3'>
							<Button
								onClick={handleConfirmAll}
								disabled={submitting !== null}
								className='w-full'>
								{submitting === 'all' ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Procesando...
									</>
								) : (
									<>
										<CheckCircle2 className='mr-2 h-4 w-4' />
										Confirmar todas ({pending.length})
									</>
								)}
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</Alert>
		</div>
	)
}
