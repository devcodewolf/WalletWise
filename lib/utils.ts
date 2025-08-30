import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const monthNames = [
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
];

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
