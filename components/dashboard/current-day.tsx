export function CurrentDay() {
	const now = new Date()

	// Día de la semana en español (capitalizado)
	const weekday = now.toLocaleDateString('es-ES', { weekday: 'long' })
	const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1)

	// Día numérico
	const day = now.getDate()

	// Mes en español (capitalizado)
	const month = now.toLocaleDateString('es-ES', { month: 'long' })
	const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1)

	// Año
	const year = now.getFullYear()

	return (
		<div className='flex flex-col justify-center h-full gap-1'>
			{/* Badge HOY */}
			<span className='text-xs font-semibold tracking-widest text-primary/80 uppercase'>
				Hoy
			</span>

			{/* Línea principal: Jueves, 28 de Febrero */}
			<p className='text-2xl font-bold tracking-tight leading-tight'>
				<span className='text-foreground'>{weekdayCapitalized},</span>{' '}
				<span className='text-muted-foreground font-normal'>
					{day} de {monthCapitalized}
				</span>
			</p>

			{/* Año */}
			<span className='text-sm text-muted-foreground/60 font-medium tracking-wide'>
				{year}
			</span>
		</div>
	)
}
