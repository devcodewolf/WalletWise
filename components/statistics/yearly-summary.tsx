interface YearlySummaryProps {
	totalIngresos: number
	totalGastos: number
	balanceNeto: number
}

function formatCurrency(value: number) {
	return value.toLocaleString('es-ES', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}

export function YearlySummary({
	totalIngresos,
	totalGastos,
	balanceNeto,
}: YearlySummaryProps) {
	return (
		<div className='md:flex md:flex-col lg:flex-row justify-around *:flex-1 *:py-3 gap-2 rounded-xl bg-background/40 border border-border px-4 mt-5 mx-5 md:mx-0 lg:mx-5'>
			<div className='flex flex-col items-center gap-0.5'>
				<span className='text-[10px] uppercase tracking-widest text-neutral-500 font-semibold'>
					Total Ingresos
				</span>
				<span className='text-base font-bold text-green-600'>
					€{formatCurrency(totalIngresos)}
				</span>
			</div>
			<div className='flex flex-col items-center gap-0.5 border-y lg:border-x lg:border-y-0 border-border'>
				<span className='text-[10px] uppercase tracking-widest text-neutral-500 font-semibold'>
					Total Gastos
				</span>
				<span className='text-base font-bold text-red-400'>
					€{formatCurrency(totalGastos)}
				</span>
			</div>
			<div className='flex flex-col items-center gap-0.5'>
				<span className='text-[10px] uppercase tracking-widest text-neutral-500 font-semibold'>
					Balance Neto
				</span>
				<span
					className={`text-base font-bold ${balanceNeto >= 0 ? 'text-blue-500' : 'text-red-400'}`}>
					{balanceNeto >= 0 ? '+' : '-'} €{formatCurrency(balanceNeto)}
				</span>
			</div>
		</div>
	)
}
