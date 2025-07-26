'use client';

import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { TransactionWithRelations } from '@/types/transactions.types';

interface CategoryPieChartProps {
	transactions: TransactionWithRelations[];
}

const COLORS = [
	'#8ec5ff',
	'#2b7fff',
	'#155dfc',
	'#a5f3fc',
	'#1447e6',
	'#193cb8',
	'#8b5cf6',
];

// Función utilitaria para agrupar y calcular totales por categoría
type PieDatum = { name: string; value: number; percentage: string };

function getCategoryPieData(
	transactions: TransactionWithRelations[],
	tipo: 'Gasto' | 'Ingreso'
): PieDatum[] {
	const categoryData = transactions
		.filter((transaction) => transaction.type === tipo)
		.reduce((acc, transaction) => {
			const categoryName = transaction.category?.name || 'Sin Categoría';
			acc[categoryName] = (acc[categoryName] || 0) + transaction.amount;
			return acc;
		}, {} as Record<string, number>);

	const total = Object.values(categoryData).reduce((a, b) => a + b, 0);
	return Object.entries(categoryData).map(([category, amount]) => ({
		name: category,
		value: amount,
		percentage: total ? ((amount / total) * 100).toFixed(1) : '0',
	}));
}

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
	const gastosData = getCategoryPieData(transactions, 'Gasto');
	const ingresosData = getCategoryPieData(transactions, 'Ingreso');

	const getChartConfig = (pieData: PieDatum[]) =>
		pieData.reduce((config, item, index) => {
			config[item.name.toLowerCase().replace(/\s+/g, '')] = {
				label: item.name,
				color: COLORS[index % COLORS.length],
			};
			return config;
		}, {} as Record<string, { label: string; color: string }>);

	return (
		<div className="flex items-center gap-4 flex-1 py-4">
			<div className="w-6/12">
				<h3 className="text-md font-semibold mb-2  text-center">Gastos</h3>
				{gastosData.length === 0 ? (
					<div className="flex items-center justify-center h-[100px] text-gray-400 text-sm">
						No hay gastos este año
					</div>
				) : (
					<ChartContainer
						config={getChartConfig(gastosData)}
						className="w-full min-h-[100px] h-[100px]">
						<PieChart>
							<Pie
								data={gastosData}
								cx="50%"
								cy="50%"
								outerRadius={50}
								fill="#ef4444"
								dataKey="value"
								label={false}>
								{gastosData.map((entry, index) => (
									<Cell
										key={`gasto-cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<ChartTooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										const data = payload[0].payload;
										return (
											<div className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white">
												<p className="font-medium text-sm">{data.name}</p>
												<p className="text-xs text-gray-300">
													€{data.value.toLocaleString()} ({data.percentage}%)
												</p>
											</div>
										);
									}
									return null;
								}}
							/>
						</PieChart>
					</ChartContainer>
				)}
			</div>
			<div className="w-6/12">
				<h3 className="text-md font-semibold mb-2 text-center">Ingresos</h3>
				{ingresosData.length === 0 ? (
					<div className="flex items-center justify-center h-[100px] text-gray-400 text-sm">
						No hay ingresos este año
					</div>
				) : (
					<ChartContainer
						config={getChartConfig(ingresosData)}
						className="w-full min-h-[100px] h-[100px]">
						<PieChart>
							<Pie
								data={ingresosData}
								cx="50%"
								cy="50%"
								outerRadius={50}
								fill="#10b981"
								dataKey="value"
								label={false}>
								{ingresosData.map((entry, index) => (
									<Cell
										key={`ingreso-cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<ChartTooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										const data = payload[0].payload;
										return (
											<div className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white">
												<p className="font-medium text-sm">{data.name}</p>
												<p className="text-xs text-gray-300">
													€{data.value.toLocaleString()} ({data.percentage}%)
												</p>
											</div>
										);
									}
									return null;
								}}
							/>
						</PieChart>
					</ChartContainer>
				)}
			</div>
		</div>
	);
}
