'use client';

import { DataTable } from '@/components/ui/data-table';
import { dashboardColumns } from './dashboard-columns';
import { Transaction } from '@prisma/client';
import { useEffect, useState } from 'react';
import { CreditCard, PiggyBank } from 'lucide-react';
import { Separator } from '../ui/separator';

type TransactionsDashboardProps = {
	data: Transaction[];
};

export function TransactionsDashboard({
	data: initialData,
}: TransactionsDashboardProps) {
	const [transactions, setTransactions] = useState<Transaction[]>(initialData);

	// Update transactions when initialData changes
	useEffect(() => {
		// console.log('UseEffect transaction list', initialData);
		setTransactions(initialData);
	}, [initialData]);

	// Filtrar gastos y tomar los 5 más recientes
	const expenses = transactions
		.filter((transaction) => transaction.type === 'Gasto')
		.slice(0, 20);

	// Filtrar ingresos y tomar los 5 más recientes
	const incomes = transactions
		.filter((transaction) => transaction.type === 'Ingreso')
		.slice(0, 20);

	return (
		<>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<CreditCard className="size-5" />
						<Separator
							orientation="vertical"
							className="data-[orientation=vertical]:h-6"
						/>
						<h3 className="text-lg font-semibold">Últimos Gastos</h3>
					</div>
					<div className="rounded-md border p-4">
						<DataTable
							columns={dashboardColumns}
							data={expenses}
							limitShow={5}
						/>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<PiggyBank className="size-5" />
						<Separator
							orientation="vertical"
							className="data-[orientation=vertical]:h-6"
						/>
						<h3 className="text-lg font-semibold">Últimos Ingresos</h3>
					</div>
					<div className="rounded-md border p-4">
						<DataTable
							columns={dashboardColumns}
							data={incomes}
							limitShow={5}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
