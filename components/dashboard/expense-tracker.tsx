'use client';

import { Transaction } from '@prisma/client';
import { useExpenseTracker } from '@/hooks/use-expenseTracker';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type ExpenseTrackerProps = {
	data: Transaction[];
};

export function ExpenseTracker({ data: transactions }: ExpenseTrackerProps) {
	const {
		currentMonthIncome,
		currentMonthExpense,
		currentMonthTransactionCount,
		dailyExpenseAvg,
		incomeVariation,
		expenseVariation,
		balance,
		balancePercentage,
	} = useExpenseTracker(transactions);

	return (
		<>
			{/* Métricas Cards */}
			<section>
				<p className="text-[11px] text-gray-400 mb-2 mr-2 text-right">
					(*) Datos comparativos 3 meses anteriores
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{/* Total Ingresos */}
					<Card className="gap-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Total Ingresos
							</CardTitle>
							<div className="flex items-center text-green-500 text-sm">
								<TrendingUp className="size-4 mr-1" />
								{incomeVariation >= 0 ? '+' : ''}
								{incomeVariation.toFixed(1)}%
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-500">
								€{currentMonthIncome.toFixed(2)}
							</div>
							<p className="text-xs text-gray-500 mt-1">
								{incomeVariation > 0 && 'Aumento en ingresos este mes'}
								{incomeVariation < 0 && 'Reducción en ingresos este mes'}
								{incomeVariation === 0 && 'Ingresos estables'}
							</p>
							<p className="text-xs text-gray-400">
								{incomeVariation > 0 && 'Flujo positivo constante'}
								{incomeVariation < 0 && 'Flujo negativo constante'}
								{incomeVariation === 0 && 'Flujo constante'}
							</p>
						</CardContent>
					</Card>
					{/* Total Gastos */}
					<Card className="gap-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Total Gastos
							</CardTitle>
							<div className="flex items-center text-red-500 text-sm">
								<TrendingDown className="size-4 mr-1" />
								{expenseVariation >= 0 ? '+' : ''}
								{expenseVariation.toFixed(1)}%
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-red-500">
								€{currentMonthExpense.toFixed(2)}
							</div>
							<p className="text-xs text-gray-500 mt-1">
								{expenseVariation > 0 && 'Aumento en gastos este mes'}
								{expenseVariation < 0 && 'Reducción en gastos este mes'}
								{expenseVariation === 0 && 'Sin cambios en gastos este mes'}
							</p>
							<p className="text-xs text-gray-400">
								{expenseVariation > 0 &&
									'Los gastos han aumentado en comparación con el promedio'}
								{expenseVariation < 0 &&
									'Los gastos han mejorado en comparación con el promedio'}
								{expenseVariation === 0 && 'Gastos estables'}
							</p>
						</CardContent>
					</Card>
					{/* Balance */}
					<Card className="gap-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Balance Total
							</CardTitle>
							<div
								className={`flex items-center text-sm ${
									balance >= 0 ? 'text-green-500' : 'text-red-500'
								}`}>
								{balance >= 0 ? (
									<TrendingUp className="size-4 mr-1" />
								) : (
									<TrendingDown className="size-4 mr-1" />
								)}
								{balancePercentage.toFixed(1)}%
							</div>
						</CardHeader>
						<CardContent>
							<div
								className={`text-2xl font-bold ${
									balance >= 0 ? 'text-green-500' : 'text-red-500'
								}`}>
								€{balance.toFixed(2)}
							</div>
							<p className="text-xs text-gray-500 mt-1">
								{balance >= 0 ? 'Superávit' : 'Déficit'} actual
							</p>
							<p className="text-xs text-gray-400">
								{balance >= 0
									? 'Situación financiera saludable'
									: 'Revisar gastos'}
							</p>
						</CardContent>
					</Card>
					{/* Promedio Diario */}
					<Card className="gap-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-400">
								Gasto Promedio
							</CardTitle>
							<div className="flex items-center text-blue-500 text-sm">
								<Target className="size-4 mr-1" />
								Diario
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-blue-500">
								€{dailyExpenseAvg.toFixed(2)}
							</div>
							<p className="text-xs text-gray-500 mt-1">Por día este mes</p>
							<p className="text-xs text-gray-400">
								{currentMonthTransactionCount} transacciones totales
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</>
	);
}
