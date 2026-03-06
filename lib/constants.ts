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
