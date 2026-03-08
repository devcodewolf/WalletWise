export const MONTH_NAMES = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
] as const

/**
 * Convierte un número de mes (1-12) y año a una etiqueta legible.
 * Ejemplo: monthLabel(3, 2026) → "Marzo 2026"
 */
export function monthLabel(month: number, year: number): string {
	return `${MONTH_NAMES[month - 1]} ${year}`
}

export type MonthYear = {
	year: number
	month: number // 1-12
}

export const PRESET_COLORS = [
	'#ef4444', // rojo
	'#f97316', // naranja
	'#eab308', // amarillo
	'#22c55e', // verde
	'#16a34a', // verde oscuro
	'#14b8a6', // teal
	'#3b82f6', // azul
	'#6366f1', // índigo
	'#8b5cf6', // violeta
	'#a855f7', // púrpura
	'#ec4899', // rosa
	'#f43f5e', // rosa-rojo
	'#84cc16', // verde lima
	'#06b6d4', // cyan
]
