'use client';

import { Transaction } from '@prisma/client';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

interface QuarterlySummaryProps {
	transactions: Transaction[];
}

export function QuarterlySummary({ transactions }: QuarterlySummaryProps) {
	// Calcular datos por trimestre
	const quarters = [
		{ name: 'Q1', months: [1, 2, 3], label: 'Ene-Mar' },
		{ name: 'Q2', months: [4, 5, 6], label: 'Abr-Jun' },
		{ name: 'Q3', months: [7, 8, 9], label: 'Jul-Sep' },
		{ name: 'Q4', months: [10, 11, 12], label: 'Oct-Dic' },
	];

	const quarterlyData = quarters
		.map((quarter) => {
			const quarterTransactions = transactions.filter((t) =>
				quarter.months.includes(t.date.getMonth() + 1)
			);

			const expenses = quarterTransactions
				.filter((t) => t.type === 'Gasto')
				.reduce((sum, t) => sum + t.amount, 0);
			const income = quarterTransactions
				.filter((t) => t.type === 'Ingreso')
				.reduce((sum, t) => sum + t.amount, 0);

			return {
				...quarter,
				expenses,
				income,
				balance: income - expenses,
				hasData: expenses > 0 || income > 0,
			};
		})
		.filter((quarter) => quarter.hasData);

	return (
		<>
			<div className="max-h-80 overflow-y-auto">
				{quarterlyData.length === 0 ? (
					<div className="text-center text-gray-400 py-8">
						No hay datos para este año
					</div>
				) : (
					quarterlyData.map((quarter, _) => (
						<div key={quarter.name} className="pt-2">
							<h4 className="font-medium  text-sm mb-1">
								{quarter.name} - {quarter.label}
							</h4>
							<div className="grid grid-cols-3 gap-3">
								{/* Ingresos Card */}
								<div className="bg-muted rounded-lg p-3 flex items-center gap-3 dark:bg-zinc-700">
									<div className="p-2 bg-green-500/20 rounded-lg">
										<TrendingUp className="h-4 w-4 text-green-500" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs text-black dark:text-gray-400">
											Ingresos
										</p>
										<p className="text-sm font-semibold text-green-500 truncate">
											{quarter.income.toLocaleString()}€
										</p>
									</div>
								</div>

								{/* Gastos Card */}
								<div className="bg-muted rounded-lg p-3 flex items-center gap-3 dark:bg-zinc-700">
									<div className="p-2 bg-red-500/20 rounded-lg">
										<TrendingDown className="h-4 w-4 text-red-500" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs text-black dark:text-gray-400">
											Gastos
										</p>
										<p className="text-sm font-semibold text-red-500 truncate">
											{quarter.expenses.toLocaleString()}€
										</p>
									</div>
								</div>

								{/* Balance Card */}
								<div className="bg-muted dark:bg-zinc-700 rounded-lg p-3 flex items-center gap-3">
									<div
										className={`p-2 rounded-lg ${
											quarter.balance >= 0
												? 'bg-blue-500/20'
												: 'bg-orange-500/20'
										}`}>
										<Wallet
											className={`h-4 w-4 ${
												quarter.balance >= 0
													? 'text-blue-500'
													: 'text-orange-500'
											}`}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs text-black dark:text-gray-400">
											Balance
										</p>
										<p
											className={`text-sm font-semibold truncate ${
												quarter.balance >= 0
													? 'text-blue-500'
													: 'text-orange-500'
											}`}>
											{quarter.balance.toLocaleString()}€
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
