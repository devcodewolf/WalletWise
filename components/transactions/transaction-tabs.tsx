'use client';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface TransactionTabsProps {
	value: 'Todos' | 'Gasto' | 'Ingreso';
	onValueChange: (val: 'Todos' | 'Gasto' | 'Ingreso') => void;
}

export const TransactionTabs: React.FC<TransactionTabsProps> = ({
	value,
	onValueChange,
}) => (
	<Tabs
		value={value}
		onValueChange={(val) =>
			onValueChange(val as 'Todos' | 'Gasto' | 'Ingreso')
		}>
		<TabsList className="dark:bg-neutral-700">
			<TabsTrigger
				value="Todos"
				className="data-[state=active]:ring data-[state=active]:ring-neutral-300 dark:data-[state=active]:ring-neutral-800/80 data-[state=active]:shadow-xs">
				Todos
			</TabsTrigger>
			<TabsTrigger
				value="Gasto"
				className="data-[state=active]:ring data-[state=active]:ring-neutral-300 dark:data-[state=active]:ring-neutral-800/80 data-[state=active]:shadow-xs">
				Gasto
			</TabsTrigger>
			<TabsTrigger
				value="Ingreso"
				className="data-[state=active]:ring data-[state=active]:ring-neutral-300 dark:data-[state=active]:ring-neutral-800/80 data-[state=active]:shadow-xs">
				Ingreso
			</TabsTrigger>
		</TabsList>
	</Tabs>
);
