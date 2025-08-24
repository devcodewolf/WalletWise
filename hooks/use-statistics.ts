import { useState, useMemo, useEffect } from 'react';
import { Transaction } from '@prisma/client';
import { TransactionWithRelations } from '@/types/transactions.types';
import { monthNames } from '@/lib/utils';

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

	// Memoize availableMonths para evitar recalculos innecesarios
	const availableMonths = useMemo(() => {
		const monthsInYear = new Set<number>();
		yearlyTransactions.forEach((transaction) => {
			const date =
				transaction.date instanceof Date
					? transaction.date
					: new Date(transaction.date);
			monthsInYear.add(date.getMonth());
		});

		const sortedMonths = Array.from(monthsInYear).sort((a, b) => a - b);

		return sortedMonths.map((monthIndex) => ({
			value: (monthIndex + 1).toString(),
			label: monthNames[monthIndex],
		}));
	}, [yearlyTransactions]);

	useEffect(() => {
		// Si el mes seleccionado ya no está disponible en el nuevo año,
		// selecciona el primer mes disponible para evitar un estado inconsistente.
		if (
			availableMonths.length > 0 &&
			!availableMonths.find((m) => m.value === selectedMonth)
		) {
			setSelectedMonth(availableMonths[0].value);
		}
	}, [availableMonths, selectedMonth]);

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
		months: availableMonths,
		monthlyTransactions,
	};
}
