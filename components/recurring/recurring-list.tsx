import { getRecurringTransactions } from '@/actions/recurring'
import { Card } from '@/components/ui/card'
import {
	CheckCircle2,
	DollarSign,
	TrendingDown,
	PauseCircle,
} from 'lucide-react'
import { RecurringCard } from './recurring-card'

interface RecurringListProps {
	limitShow?: number
}

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
	}).format(amount)
}

export const RecurringList = async ({ limitShow }: RecurringListProps) => {
	const respRecurring = await getRecurringTransactions()
	const recurring =
		respRecurring.success && 'data' in respRecurring ? respRecurring.data : []

	// Total activos
	const totalActivos = recurring.filter((r) => r.isActive).length

	// Total desactivos
	const totalDesactivos = recurring.filter((r) => !r.isActive).length

	// Total mensual gastos (assume 'Gasto')
	const totalMensualGastos = recurring.reduce((acc, r) => {
		if (r.type === 'Gasto' && r.isActive) {
			const monthlyAmt = r.frequency === 'YEARLY' ? r.amount / 12 : r.amount
			return acc + monthlyAmt
		}
		return acc
	}, 0)

	// Total mensual ingresos (assume 'Ingreso')
	const totalMensualIngresos = recurring.reduce((acc, r) => {
		if (r.type === 'Ingreso' && r.isActive) {
			const monthlyAmt = r.frequency === 'YEARLY' ? r.amount / 12 : r.amount
			return acc + monthlyAmt
		}
		return acc
	}, 0)

	const displayList = limitShow ? recurring.slice(0, limitShow) : recurring

	return (
		<div className='space-y-4'>
			{/* Top Summary Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				<Card className='flex flex-row items-center gap-4 p-5'>
					<div className='size-12 rounded-xl bg-blue-500/20 flex flex-col items-center justify-center text-blue-400'>
						<CheckCircle2 size={24} />
					</div>
					<div className='flex flex-col whitespace-nowrap'>
						<p className='text-[10px] font-semibold text-muted-foreground uppercase'>
							Total Activos
						</p>
						<p className='text-lg font-bold'>{totalActivos}</p>
					</div>
				</Card>

				<Card className='flex flex-row items-center gap-4 p-5'>
					<div className='size-12 rounded-xl bg-red-500/20 flex flex-col items-center justify-center text-red-400'>
						<TrendingDown size={24} />
					</div>
					<div className='flex flex-col whitespace-nowrap'>
						<p className='text-[10px] font-semibold text-muted-foreground uppercase'>
							Mensual Gastos
						</p>
						<p className='text-lg font-bold text-red-400'>
							{formatCurrency(totalMensualGastos)}
						</p>
					</div>
				</Card>

				<Card className='flex flex-row items-center gap-4 p-5'>
					<div className='size-12 rounded-xl bg-emerald-500/20 flex flex-col items-center justify-center text-emerald-400'>
						<DollarSign size={24} />
					</div>
					<div className='flex flex-col whitespace-nowrap'>
						<p className='text-[10px] font-semibold text-muted-foreground uppercase'>
							Mensual Ingresos
						</p>
						<p className='text-lg font-bold text-emerald-400'>
							{formatCurrency(totalMensualIngresos)}
						</p>
					</div>
				</Card>

				<Card className='flex flex-row items-center gap-4 p-5'>
					<div className='size-12 rounded-xl bg-neutral-500/20 flex flex-col items-center justify-center text-neutral-400'>
						<PauseCircle size={24} />
					</div>
					<div className='flex flex-col whitespace-nowrap'>
						<p className='text-[10px] font-semibold text-muted-foreground uppercase'>
							Total Inactivos
						</p>
						<p className='text-lg font-bold'>{totalDesactivos}</p>
					</div>
				</Card>
			</div>

			{/* Grid of Recurring Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{displayList.map((item) => (
					<RecurringCard key={item.id} recurring={item} />
				))}
				{displayList.length === 0 && (
					<div className='col-span-full py-12 text-center text-muted-foreground border border-dashed rounded-xl'>
						<p>No hay transacciones recurrentes todavía.</p>
					</div>
				)}
			</div>
		</div>
	)
}
