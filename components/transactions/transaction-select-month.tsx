'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface TransactionSelectMonthProps {
	value: string;
	onValueChange: (value: string) => void;
	months: { value: string; label: string }[];
}

export const TransactionSelectMonth = ({
	value,
	onValueChange,
	months,
}: TransactionSelectMonthProps) => {
	return (
		<Select
			value={value}
			onValueChange={onValueChange}
			disabled={months.length <= 1}>
			<SelectTrigger className="w-[120px]">
				<SelectValue placeholder="Meses" />
			</SelectTrigger>
			<SelectContent>
				{months.map((month) => (
					<SelectItem key={month.value} value={month.value}>
						{month.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
