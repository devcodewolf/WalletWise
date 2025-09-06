'use client';

import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { TransactionWithRelations } from '@/types/transactions.types';

interface CategoryPieChartProps {
	transactions: TransactionWithRelations[];
}

const COLORS = [
	'#ffb86a',
	'#9ae600',
	'#00d492',
	'#00d5be',
	'#00d3f3',
	'#51a2ff',
	'#7c86ff',
	'#ed6bff',
	'#c27aff',
	'#fb64b6',
];

// Función utilitaria para agrupar y calcular totales por categoría
type PieDatum = {
	name: string;
	value: number;
	percentage: string;
	color: string;
};

// Utilidades de color
function normalizeColor(color?: string): string | undefined {
	if (!color) return undefined;
	const c = color.trim().toLowerCase();
	// convertir nombres comunes a hex por simplicidad
	if (c === 'white') return '#ffffff';
	if (c === 'black') return '#000000';
	return c;
}

function isWhiteOrBlack(color?: string): boolean {
	const c = normalizeColor(color);
	return c === '#ffffff' || c === '#fff' || c === '#000000' || c === '#000';
}

// Función simple para generar un color basado en el nombre de la categoría
function getDeterministicColor(categoryName: string): string {
	// Genera un hash simple del nombre de la categoría
	let hash = 0;
	for (let i = 0; i < categoryName.length; i++) {
		hash = (hash << 5) - hash + categoryName.charCodeAt(i);
		hash = hash & hash; // Convierte a entero de 32 bits
	}
	// Usa el valor absoluto para evitar índices negativos
	return COLORS[Math.abs(hash) % COLORS.length];
}

function getCategoryPieData(
	transactions: TransactionWithRelations[],
	tipo: 'Gasto' | 'Ingreso'
): PieDatum[] {
	const aggregated = transactions
		.filter((transaction) => transaction.type === tipo)
		.reduce((acc, transaction) => {
			const categoryName = transaction.category?.name || 'Sin Categoría';
			const rawColor = transaction.category?.color as unknown as
				| string
				| undefined;
			const color = normalizeColor(rawColor);

			if (!acc[categoryName]) {
				acc[categoryName] = { value: 0, color };
			}
			acc[categoryName].value += transaction.amount;
			// Si posteriormente llega un color válido y antes no lo había, lo guardamos
			if (!acc[categoryName].color && color) acc[categoryName].color = color;
			return acc;
		}, {} as Record<string, { value: number; color?: string }>);

	const total = Object.values(aggregated).reduce((a, b) => a + b.value, 0);

	// Ordenamos las categorías alfabéticamente para consistencia
	const sortedCategories = Object.keys(aggregated).sort((a, b) =>
		a.localeCompare(b)
	);

	return sortedCategories.map((category) => {
		let color = aggregated[category].color;

		// Si no hay color o es blanco/negro, generamos uno determinista
		if (!color || isWhiteOrBlack(color)) {
			color = getDeterministicColor(category);
		}

		return {
			name: category,
			value: aggregated[category].value,
			percentage: total
				? ((aggregated[category].value / total) * 100).toFixed(1)
				: '0',
			color: color,
		};
	});
}

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
	const gastosData = getCategoryPieData(transactions, 'Gasto');
	const ingresosData = getCategoryPieData(transactions, 'Ingreso');

	const getChartConfig = (pieData: PieDatum[]) =>
		pieData.reduce((config, item) => {
			config[item.name.toLowerCase().replace(/\s+/g, '')] = {
				label: item.name,
				color: item.color,
			};
			return config;
		}, {} as Record<string, { label: string; color: string }>);

	return (
		<div className="flex items-center gap-4 flex-1 py-4">
			<div className="w-6/12">
				<h3 className="text-md font-semibold mb-2  text-center">Gastos</h3>
				{gastosData.length === 0 ? (
					<div className="flex items-center justify-center h-[100px] text-gray-400 text-sm">
						No hay gastos en el periodo seleccionado
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
									<Cell key={`gasto-cell-${index}`} fill={entry.color} />
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
						No hay ingresos en el periodo seleccionado
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
									<Cell key={`ingreso-cell-${index}`} fill={entry.color} />
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
