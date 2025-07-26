'use client';

import { Transaction } from '@prisma/client';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

interface AnnualBalanceProps {
	transactions: Transaction[];
}

export function AnnualBalance({ transactions }: AnnualBalanceProps) {
	// Agrupar transacciones por año y calcular totales de forma eficiente
	const balancesByYear = transactions.reduce((acc, transaction) => {
		const year = new Date(transaction.date).getFullYear();
		if (!acc[year]) {
			acc[year] = { income: 0, expenses: 0, year };
		}

		if (transaction.type === 'Ingreso') {
			acc[year].income += transaction.amount;
		} else if (transaction.type === 'Gasto') {
			acc[year].expenses += transaction.amount;
		}

		return acc;
	}, {} as Record<number, { income: number; expenses: number; year: number }>);

	// Convertir el objeto en un array, calcular el balance y ordenar
	const yearlyBalances = Object.values(balancesByYear)
		.map(({ year, income, expenses }) => ({
			year,
			income,
			expenses,
			balance: income - expenses,
		}))
		.sort((a, b) => b.year - a.year); // Ordenar por año descendente

	return (
		<>
			<div>
				<div className="max-h-80 overflow-y-auto space-y-2">
					{yearlyBalances.length === 0 ? (
						<div className="text-center text-gray-400 py-8">
							No hay datos disponibles
						</div>
					) : (
						yearlyBalances.map((yearData) => (
							<div
								key={yearData.year}
								className="p-3 bg-muted rounded-lg dark:bg-zinc-700">
								<h4 className="font-medium mb-3">Año {yearData.year}</h4>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<TrendingUp className="h-4 w-4 text-green-500" />
											<span className="text-sm text-black dark:text-gray-400">
												Ingresos
											</span>
										</div>
										<span className="text-sm font-medium text-green-500">
											{yearData.income.toLocaleString()}€
										</span>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<TrendingDown className="h-4 w-4 text-red-500" />
											<span className="text-sm text-black dark:text-gray-400">
												Gastos
											</span>
										</div>
										<span className="text-sm font-medium text-red-500">
											{yearData.expenses.toLocaleString()}€
										</span>
									</div>
									<div className="flex items-center justify-between border-t border-gray-300 ptr-gray-700 pt-2">
										<div className="flex items-center gap-2">
											<Wallet
												className={`h-4 w-4 ${
													yearData.balance >= 0
														? 'text-blue-500'
														: 'text-orange-500'
												}`}
											/>
											<span className="text-sm text-black dark:text-gray-400">
												Balance
											</span>
										</div>
										<span
											className={`text-sm font-medium ${
												yearData.balance >= 0
													? 'text-blue-500'
													: 'text-orange-500'
											}`}>
											{yearData.balance.toLocaleString()}€
										</span>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
}
