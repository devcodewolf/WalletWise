'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Transaction } from '@prisma/client';

interface YearlyChartProps {
	transactions: Transaction[];
}

export function YearlyChart({ transactions }: YearlyChartProps) {
	// Agrupar por meses
	const monthlyData = Array.from({ length: 12 }, (_, i) => {
		const month = i + 1;
		const monthTransactions = transactions.filter(
			(t) => t.date.getMonth() + 1 === month
		);

		const expenses = monthTransactions
			.filter((t) => t.type === 'Gasto')
			.reduce((sum, t) => sum + t.amount, 0);
		const income = monthTransactions
			.filter((t) => t.type === 'Ingreso')
			.reduce((sum, t) => sum + t.amount, 0);

		const monthNames = [
			'Ene',
			'Feb',
			'Mar',
			'Abr',
			'May',
			'Jun',
			'Jul',
			'Ago',
			'Sep',
			'Oct',
			'Nov',
			'Dic',
		];

		return {
			month: monthNames[i],
			gastos: expenses,
			ingresos: income,
		};
	});

	const chartConfig = {
		gastos: {
			label: 'Gastos',
			color: '#e11d48',
		},
		ingresos: {
			label: 'Ingresos',
			color: '#22c55e',
		},
	};

	return (
		<ChartContainer
			config={chartConfig}
			className="min-h-[225px] h-[225px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={monthlyData}
					margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
					<XAxis
						dataKey="month"
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
					<ChartTooltip
						content={<ChartTooltipContent />}
						contentStyle={{
							backgroundColor: '#1F2937',
							border: '1px solid #374151',
							borderRadius: '6px',
							color: '#F9FAFB',
						}}
					/>
					<Bar
						dataKey="gastos"
						fill="var(--color-gastos)"
						radius={[2, 2, 0, 0]}
					/>
					<Bar
						dataKey="ingresos"
						fill="var(--color-ingresos)"
						radius={[2, 2, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}
