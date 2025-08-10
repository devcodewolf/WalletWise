'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Transaction } from '@prisma/client';

interface MonthlyChartProps {
	selectedMonth: number;
	selectedYear: number;
	transactions: Transaction[];
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
	// console.log(transactions);

	// Calcular totales de gastos e ingresos
	const totalGastos = transactions
		.filter((t) => t.type === 'Gasto')
		.reduce((sum, t) => sum + t.amount, 0);
	const totalIngresos = transactions
		.filter((t) => t.type === 'Ingreso')
		.reduce((sum, t) => sum + t.amount, 0);

	const chartData = [
		{ label: 'Gastos', total: totalGastos },
		{ label: 'Ingresos', total: totalIngresos },
	];

	// La configuración del Chart sigue siendo útil para el Tooltip
	const chartConfig = {
		gastos: {
			label: 'Gastos',
			color: '#e11d48',
		},

		ingresos: {
			label: 'Ingresos',
			color: '#22c55e',
		},
	} satisfies ChartConfig;

	const colors = [chartConfig.gastos.color, chartConfig.ingresos.color];

	if (totalGastos === 0 && totalIngresos === 0) {
		return (
			<div className="flex items-center justify-center h-[200px] text-gray-400 text-sm">
				No hay transacciones este mes
			</div>
		);
	}

	return (
		<ChartContainer
			config={chartConfig}
			className="min-h-[225px] h-[225px] w-9/12 mx-auto">
			<BarChart accessibilityLayer data={chartData} barCategoryGap="15%">
				<CartesianGrid strokeDasharray="4 4" stroke="#374151" />
				<XAxis
					dataKey="label"
					stroke="#9CA3AF"
					fontSize={10}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#9CA3AF"
					fontSize={10}
					tickFormatter={(value) => `€${value}`}
					tickLine={false}
					axisLine={false}
				/>
				{/* <ChartLegend content={<ChartLegendContent />} /> */}
				<ChartTooltip content={<ChartTooltipContent />} />

				<Bar dataKey="total" radius={4}>
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
					))}
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}
