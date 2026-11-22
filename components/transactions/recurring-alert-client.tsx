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
import { skipRecurringOccurrence } from '@/actions/recurring'
import { Bell, CheckCircle2, Loader2, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { PendingRecurringOccurrence } from '@/types/transactions.types'
import { getOccurrenceDate, occurrenceKey } from '@/lib/recurring'
import { monthLabel } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface RecurringAlertClientProps {
	className?: string
	initialPending: PendingRecurringOccurrence[]
}

const keyOf = (item: PendingRecurringOccurrence) =>
	occurrenceKey(item.id, item.occurrenceYear, item.occurrenceMonth)

const isPastMonth = (item: PendingRecurringOccurrence) => {
	const now = new Date()
	return (
		item.occurrenceYear < now.getFullYear() ||
		(item.occurrenceYear === now.getFullYear() &&
			item.occurrenceMonth < now.getMonth() + 1)
	)
}

type SubmittingState =
	| { kind: 'confirm' | 'skip'; key: string }
	| { kind: 'all' }
	| null

export function RecurringAlertClient({
	className,
	initialPending,
}: RecurringAlertClientProps) {
	const [pending, setPending] =
		useState<PendingRecurringOccurrence[]>(initialPending)
	const [isOpen, setIsOpen] = useState(false)
	const [submitting, setSubmitting] = useState<SubmittingState>(null)
	const [amounts, setAmounts] = useState<Record<string, number>>(() =>
		Object.fromEntries(initialPending.map((item) => [keyOf(item), item.amount])),
	)
	const [changedCount, setChangedCount] = useState(0)
	const router = useRouter()

	const handleAmountChange = (key: string, val: string) => {
		setAmounts((prev) => ({ ...prev, [key]: parseFloat(val) || 0 }))
	}

	const handleDialogChange = (open: boolean) => {
		setIsOpen(open)
		if (!open && changedCount > 0) {
			router.refresh()
			setChangedCount(0)
		}
	}

	// Quita una ocurrencia de la lista; si era la última, cierra y refresca
	const removeFromList = (key: string) => {
		const remaining = pending.filter((p) => keyOf(p) !== key)
		setPending(remaining)
		if (remaining.length === 0) {
			setIsOpen(false)
			setChangedCount(0)
			router.refresh()
		} else {
			setChangedCount((prev) => prev + 1)
		}
	}

	async function handleConfirmSingle(item: PendingRecurringOccurrence) {
		const key = keyOf(item)
		if (!(amounts[key] > 0)) {
			toast.error('El importe debe ser mayor que 0')
			return
		}
		setSubmitting({ kind: 'confirm', key })
		try {
			const res = await confirmRecurringTransactions([
				{
					recurringTransactionId: item.id,
					amount: amounts[key],
					year: item.occurrenceYear,
					month: item.occurrenceMonth,
				},
			])
			if (res.success) {
				toast.success(`${item.description ?? 'Movimiento'} agregado correctamente`)
				removeFromList(key)
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

	async function handleSkip(item: PendingRecurringOccurrence) {
		const key = keyOf(item)
		setSubmitting({ kind: 'skip', key })
		try {
			const res = await skipRecurringOccurrence(
				item.id,
				item.occurrenceYear,
				item.occurrenceMonth,
			)
			if (res.success) {
				toast.success(
					`${item.description ?? 'Movimiento'} desechado para ${monthLabel(item.occurrenceMonth, item.occurrenceYear)}`,
				)
				removeFromList(key)
			} else {
				toast.error((res as { error?: string }).error || 'Error al desechar')
			}
		} catch (err) {
			console.error('Error skipping recurring occurrence:', err)
			toast.error('Error inesperado')
		} finally {
			setSubmitting(null)
		}
	}

	async function handleConfirmAll() {
		if (pending.some((p) => !(amounts[keyOf(p)] > 0))) {
			toast.error('Todos los importes deben ser mayores que 0')
			return
		}
		setSubmitting({ kind: 'all' })
		try {
			const res = await confirmRecurringTransactions(
				pending.map((p) => ({
					recurringTransactionId: p.id,
					amount: amounts[keyOf(p)],
					year: p.occurrenceYear,
					month: p.occurrenceMonth,
				})),
			)
			if (res.success) {
				toast.success('Transacciones procesadas correctamente')
				setIsOpen(false)
				setPending([])
				setChangedCount(0)
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

	const hasPastMonths = pending.some(isPastMonth)

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
							Tienes {pending.length}{' '}
							{pending.length === 1
								? 'movimiento programado'
								: 'movimientos programados'}{' '}
							que aún no has registrado
							{hasPastMonths ? ', algunos de meses anteriores.' : '.'}
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
					<DialogContent className='sm:max-w-[640px]'>
						<DialogHeader>
							<DialogTitle>Transacciones Recurrentes</DialogTitle>
							<DialogDescription>
								Revisa los montos antes de incorporarlos a tu historial. Puedes
								editarlos si este mes han variado, o desecharlos si ya los
								registraste a mano.
							</DialogDescription>
						</DialogHeader>

						<div className='space-y-3 max-h-[400px] overflow-y-auto pr-2'>
							{pending.map((item) => {
								const key = keyOf(item)
								const busy =
									submitting !== null &&
									submitting.kind !== 'all' &&
									submitting.key === key
								return (
									<div
										key={key}
										className='flex items-center justify-between gap-2'>
										<div className='p-3 rounded-lg border bg-accent/5 flex items-center justify-between gap-3 flex-1 min-w-0'>
											<div className='min-w-0'>
												<p className='font-medium text-sm truncate'>
													{item.description}
												</p>
												<p className='text-xs text-muted-foreground italic'>
													{item.category?.name} • {item.wallet?.name} •{' '}
													{getOccurrenceDate(
														item.dayOfMonth,
														item.occurrenceYear,
														item.occurrenceMonth,
													).toLocaleDateString('es-ES')}
												</p>
												{isPastMonth(item) && (
													<span className='mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary'>
														{monthLabel(item.occurrenceMonth, item.occurrenceYear)}
													</span>
												)}
											</div>
											<div className='w-24 flex items-center gap-1 shrink-0'>
												<Input
													type='number'
													step='0.01'
													value={amounts[key]}
													onChange={(e) => handleAmountChange(key, e.target.value)}
													className='h-9 text-right'
												/>
												<span className='text-sm font-bold'>€</span>
											</div>
										</div>
										<Button
											variant='outline'
											size='sm'
											onClick={() => handleConfirmSingle(item)}
											disabled={submitting !== null}
											aria-label='Registrar movimiento'
											title='Registrar'
											className='h-9'>
											{busy && submitting?.kind === 'confirm' ? (
												<Loader2 className='h-4 w-4 animate-spin' />
											) : (
												<Plus className='h-4 w-4' />
											)}
										</Button>
										<Button
											variant='outline'
											size='sm'
											onClick={() => handleSkip(item)}
											disabled={submitting !== null}
											aria-label='Desechar este mes'
											title='Desechar este mes'
											className='h-9 text-destructive hover:text-destructive'>
											{busy && submitting?.kind === 'skip' ? (
												<Loader2 className='h-4 w-4 animate-spin' />
											) : (
												<Trash2 className='h-4 w-4' />
											)}
										</Button>
									</div>
								)
							})}
						</div>

						<div className='flex flex-col gap-3'>
							<Button
								onClick={handleConfirmAll}
								disabled={submitting !== null}
								className='w-full'>
								{submitting?.kind === 'all' ? (
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
