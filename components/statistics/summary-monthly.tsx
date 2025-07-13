'use client';

import { Transaction } from '@prisma/client';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

interface SummaryMonthlyProps {
	transactions: Transaction[];
}

export function SummaryMonthly({ transactions }: SummaryMonthlyProps) {
	const monthNames = [
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

	// Calcular datos por mes
	const monthlyData = Array.from({ length: 12 }, (_, i) => {
		const month = i + 1;
		const monthTransactions = transactions.filter(
			(t) => t.date.getMonth() + 1 === month
		);

		const totalExpenses = monthTransactions
			.filter((t) => t.type === 'Gasto')
			.reduce((sum, t) => sum + t.amount, 0);
		const totalIncome = monthTransactions
			.filter((t) => t.type === 'Ingreso')
			.reduce((sum, t) => sum + t.amount, 0);
		const balance = totalIncome - totalExpenses;

		return {
			month: monthNames[i],
			expenses: totalExpenses,
			income: totalIncome,
			balance,
			hasData: totalExpenses > 0 || totalIncome > 0,
		};
	}).filter((data) => data.hasData);

	return (
		<>
			<div className="max-h-80 overflow-y-auto">
				{monthlyData.length === 0 ? (
					<div className="text-center text-gray-400 py-8">
						No hay datos para este año
					</div>
				) : (
					monthlyData.map((data, _) => (
						<div
							key={data.month}
							className="border-b border-gray-300 pb-4 pt-2 last:border-b-0 dark:border-gray-700">
							<h4 className="font-medium  text-sm mb-1">{data.month}</h4>
							<div className="grid grid-cols-3 gap-3">
								{/* Ingresos Card */}
								<div className="bg-gray-200 rounded-lg p-3 flex items-center gap-3 dark:bg-gray-800">
									<div className="p-2 bg-green-500/20 rounded-lg">
										<TrendingUp className="h-4 w-4 text-green-500" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs text-black dark:text-gray-400">
											Ingresos
										</p>
										<p className="text-sm font-semibold text-green-500 truncate">
											{data.income.toLocaleString()}€
										</p>
									</div>
								</div>

								{/* Gastos Card */}
								<div className="bg-gray-200 rounded-lg p-3 flex items-center gap-3 dark:bg-gray-800">
									<div className="p-2 bg-red-500/20 rounded-lg">
										<TrendingDown className="h-4 w-4 text-red-500" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs text-black dark:text-gray-400">
											Gastos
										</p>
										<p className="text-sm font-semibold text-red-500 truncate">
											{data.expenses.toLocaleString()}€
										</p>
									</div>
								</div>

								{/* Balance Card */}
								<div className="bg-gray-200 rounded-lg p-3 flex items-center gap-3 dark:bg-gray-800">
									<div
										className={`p-2 rounded-lg ${
											data.balance >= 0 ? 'bg-blue-500/20' : 'bg-orange-500/20'
										}`}>
										<Wallet
											className={`h-4 w-4 ${
												data.balance >= 0 ? 'text-blue-500' : 'text-orange-500'
											}`}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs text-black dark:text-gray-400">
											Balance
										</p>
										<p
											className={`text-sm font-semibold truncate ${
												data.balance >= 0 ? 'text-blue-500' : 'text-orange-500'
											}`}>
											{data.balance.toLocaleString()}€
										</p>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
}
