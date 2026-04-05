'use client'

import { PieChart, Pie, Cell } from 'recharts'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { TransactionWithRelations } from '@/types/transactions.types'
import {
	ShoppingBag,
	Landmark,
	Home,
	Car,
	Zap,
	Utensils,
	Plane,
	Gift,
	CreditCard,
	DollarSign,
	HeartPulse,
	GraduationCap,
	Smartphone,
	Wifi,
	Shirt,
	Gamepad2,
	Circle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
	ShoppingBag,
	Bank: Landmark,
	Landmark,
	Home,
	Car,
	Energy: Zap,
	Zap,
	Utensils,
	Plane,
	Gift,
	CreditCard,
	DollarSign,
	HeartPulse,
	GraduationCap,
	Smartphone,
	Wifi,
	Shirt,
	Gamepad2,
	Circle,
}

interface CategoryPieChartProps {
	transactions: TransactionWithRelations[]
}

const FALLBACK_COLORS = [
	'#ffb86a',
	'#9ae600',
	'#00d492',
	'#00d5be',
	'#00d3f3',
	'#51a2ff',
	'#7c86ff',
	'#ed6bff',
	'#c27aff',
	'#fb64b6',
]

type PieDatum = {
	name: string
	value: number
	percentage: string
	color: string
	iconName: string
}

function normalizeColor(color?: string | null): string | undefined {
	if (!color) return undefined
	const c = color.trim().toLowerCase()
	if (c === 'white' || c === '#ffffff' || c === '#fff') return undefined
	if (c === 'black' || c === '#000000' || c === '#000') return undefined
	return c
}

function getDeterministicColor(name: string): string {
	let hash = 0
	for (let i = 0; i < name.length; i++) {
		hash = (hash << 5) - hash + name.charCodeAt(i)
		hash = hash & hash
	}
	return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length]
}

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0,
	}).format(amount)
}

function getCategoryData(
	transactions: TransactionWithRelations[],
	tipo: 'Gasto' | 'Ingreso',
): PieDatum[] {
	type Acc = Record<string, { value: number; color?: string; iconName: string }>

	const aggregated = transactions
		.filter((t) => t.type === tipo)
		.reduce<Acc>((acc, t) => {
			const name = t.category?.name ?? 'Sin Categoría'
			const rawColor = normalizeColor(t.category?.color)
			const iconName = t.category?.iconName ?? 'Circle'

			if (!acc[name]) {
				acc[name] = { value: 0, color: rawColor, iconName }
			}
			acc[name].value += t.amount
			if (!acc[name].color && rawColor) acc[name].color = rawColor
			return acc
		}, {})

	const total = Object.values(aggregated).reduce((a, b) => a + b.value, 0)

	return Object.keys(aggregated)
		.sort((a, b) => aggregated[b].value - aggregated[a].value) // mayor a menor
		.map((name) => ({
			name,
			value: aggregated[name].value,
			percentage: total
				? ((aggregated[name].value / total) * 100).toFixed(1)
				: '0',
			color: aggregated[name].color ?? getDeterministicColor(name),
			iconName: aggregated[name].iconName,
		}))
}

// Renderiza dinámicamente el icono de Lucide por nombre
function CategoryIcon({
	name,
	color,
	size = 14,
}: {
	name: string
	color: string
	size?: number
}) {
	const Icon = ICON_MAP[name] ?? Circle
	return <Icon size={size} color={color} />
}

// Panel completo (donut + lista de categorías)
function CategoryPanel({ title, data }: { title: string; data: PieDatum[] }) {
	const total = data.reduce((s, d) => s + d.value, 0)
	const chartConfig = data.reduce(
		(cfg, item) => {
			cfg[item.name] = { label: item.name, color: item.color }
			return cfg
		},
		{} as Record<string, { label: string; color: string }>,
	)

	return (
		<div className='md:flex flex-col gap-3 rounded-xl bg-muted/20 border border-border/40 px-4 md:px-8 py-5 flex-1 min-w-0'>
			{/* Header */}
			<h3 className='text-sm font-semibold'>{title}</h3>

			{data.length === 0 ? (
				<div className='flex items-center justify-center h-[180px] text-muted-foreground text-sm'>
					Sin datos este periodo
				</div>
			) : (
				<div className='md:flex items-start gap-4'>
					{/* Donut con total centrado */}
					{/* ── TAMAÑO DEL DONUT ──────────────────────────────────────────
					     Cambia w-[Xpx] h-[Xpx] para el contenedor.
					     Cambia innerRadius / outerRadius en el <Pie> de abajo.
					     Regla práctica: outerRadius = (tamaño / 2) - 10
					                     innerRadius = outerRadius - 23
					     ─────────────────────────────────────────────────────────── */}
					<div className='relative shrink-0 w-[190px] h-[190px]'>
						<ChartContainer config={chartConfig} className='w-full h-full'>
							<PieChart>
								<Pie
									data={data}
									cx='50%'
									cy='50%'
									innerRadius={58}
									outerRadius={88}
									paddingAngle={2}
									dataKey='value'
									startAngle={90}
									endAngle={-270}
									strokeWidth={0}>
									{data.map((entry, i) => (
										<Cell key={`cell-${i}`} fill={entry.color} />
									))}
								</Pie>
								<ChartTooltip
									wrapperStyle={{ zIndex: 50 }}
									content={({ active, payload }) => {
										if (active && payload?.length) {
											const d = payload[0].payload as PieDatum
											return (
												<div className='rounded-lg bg-background border border-border px-3 py-2 text-sm shadow-md'>
													<p className='font-medium'>{d.name}</p>
													<p className='text-muted-foreground'>
														{formatCurrency(d.value)} · {d.percentage}%
													</p>
												</div>
											)
										}
										return null
									}}
								/>
							</PieChart>
						</ChartContainer>

						{/* Total centrado absolutamente dentro del hueco del donut */}
						<div className='absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none gap-0.5'>
							<span className='text-[9px] font-semibold text-muted-foreground uppercase tracking-widest leading-none'>
								Total
							</span>
							<span className='text-sm font-bold leading-tight'>
								{formatCurrency(total)}
							</span>
						</div>
					</div>

					{/* Lista de categorías: icono izquierda, nombre + cantidad apilados a la derecha */}
					<div className='flex flex-col gap-2 flex-1 min-w-0 max-h-60 overflow-y-auto px-4'>
						{data.map((item) => (
							<div
								key={item.name}
								className='flex gap-1.5 rounded-lg bg-background/30 border border-border/30 px-3 py-2.5'>
								{/* icono */}
								<div
									className='flex items-center justify-center rounded-md size-10 shrink-0'
									style={{ backgroundColor: `${item.color}28` }}>
									<CategoryIcon
										name={item.iconName}
										color={item.color}
										size={20}
									/>
								</div>
								{/* Columna dcha: nombre, porcentaje y cantidad */}
								<div className='flex flex-col flex-1 gap-1'>
									<div className='flex items-center justify-between gap-2'>
										<span className='text-sm font-semibold truncate leading-tight'>
											{item.name}
										</span>
										<span className='text-xs font-bold tabular-nums shrink-0'>
											{item.percentage}%
										</span>
									</div>
									{/* Barra de progreso del color de la categoría */}
									<div className='h-1 w-full rounded-full bg-muted overflow-hidden'>
										<div
											className='h-full rounded-full transition-all duration-500'
											style={{
												width: `${item.percentage}%`,
												backgroundColor: item.color,
											}}
										/>
									</div>

									{/* Monto */}
									<span className='text-xs text-foreground font-bold tabular-nums leading-tight'>
										{formatCurrency(item.value)}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
	const gastosData = getCategoryData(transactions, 'Gasto')
	const ingresosData = getCategoryData(transactions, 'Ingreso')

	return (
		<div className='2xl:flex gap-4 flex-col sm:flex-row py-2'>
			<CategoryPanel title='Gastos por Categoría' data={gastosData} />
			<CategoryPanel title='Ingresos por Categoría' data={ingresosData} />
		</div>
	)
}
