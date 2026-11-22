// Utilidades compartidas (cliente y servidor) para movimientos recurrentes

// Meses anteriores al actual en los que se siguen buscando recurrentes pendientes.
// Evita que un recurrente de final de mes se pierda al cambiar de mes.
export const RECURRING_PENDING_LOOKBACK_MONTHS = 2

/**
 * Fecha en la que corresponde una ocurrencia de un recurrente.
 * Ajusta el día al último del mes si no existe (p. ej. día 31 en febrero)
 * y fija las 12:00 para evitar problemas de zona horaria.
 * @param month 1-12
 */
export function getOccurrenceDate(
	dayOfMonth: number,
	year: number,
	month: number,
): Date {
	const lastDayOfMonth = new Date(year, month, 0).getDate()
	const effectiveDay = Math.min(dayOfMonth, lastDayOfMonth)
	return new Date(year, month - 1, effectiveDay, 12, 0, 0)
}

export function occurrenceKey(
	recurringTransactionId: number,
	year: number,
	month: number,
): string {
	return `${recurringTransactionId}-${year}-${month}`
}
