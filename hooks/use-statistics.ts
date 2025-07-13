import { useState, useMemo } from 'react';
import { Transaction } from '@prisma/client';
import { TransactionWithRelations } from '@/types/transactions.types';

const MONTHS = [
	{ value: '1', label: 'Enero' },
	{ value: '2', label: 'Febrero' },
	{ value: '3', label: 'Marzo' },
	{ value: '4', label: 'Abril' },
	{ value: '5', label: 'Mayo' },
	{ value: '6', label: 'Junio' },
	{ value: '7', label: 'Julio' },
	{ value: '8', label: 'Agosto' },
	{ value: '9', label: 'Septiembre' },
	{ value: '10', label: 'Octubre' },
	{ value: '11', label: 'Noviembre' },
	{ value: '12', label: 'Diciembre' },
];

interface UseStatisticsProps<T extends Transaction | TransactionWithRelations> {
	transactions: T[];
}

export function useStatistics<
	T extends Transaction | TransactionWithRelations
>({ transactions }: UseStatisticsProps<T>) {
	// Estados para manejar la selección del año y mes
	const [selectedYear, setSelectedYear] = useState<string>(
		new Date().getFullYear().toString()
	);
	const [selectedMonth, setSelectedMonth] = useState<string>(
		(new Date().getMonth() + 1).toString()
	);

	// Memoize availableYears para evitar recalculos innecesarios
	const availableYears = useMemo(() => {
		return Array.from(
			new Set(
				transactions.map((t: Transaction) => {
					const date = t.date instanceof Date ? t.date : new Date(t.date);
					return date.getFullYear();
				})
			)
		)
			.sort((a: number, b: number) => a - b)
			.map(String);
	}, [transactions]);

	// Memoize yearlyTransactions para que solo se recalcule cuando cambie selectedYear o transactions
	const yearlyTransactions = useMemo(() => {
		return transactions.filter((t) => {
			const date = t.date instanceof Date ? t.date : new Date(t.date);
			return date.getFullYear() === Number(selectedYear);
		});
	}, [transactions, selectedYear]);

	const monthlyTransactions = useMemo(() => {
		return transactions.filter((t) => {
			const date = t.date instanceof Date ? t.date : new Date(t.date);
			return (
				date.getFullYear() === Number(selectedYear) &&
				date.getMonth() + 1 === Number(selectedMonth)
			);
		});
	}, [transactions, selectedYear, selectedMonth]);

	return {
		selectedYear,
		setSelectedYear,
		availableYears,
		yearlyTransactions,
		selectedMonth,
		setSelectedMonth,
		months: MONTHS,
		monthlyTransactions,
	};
}
