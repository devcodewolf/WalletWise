'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface TransactionSelectYearProps {
	value: string;
	onValueChange: (value: string) => void;
	years: string[];
}

export const TransactionSelectYear = ({
	value,
	onValueChange,
	years,
}: TransactionSelectYearProps) => {
	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger className="w-[120px]">
				<SelectValue placeholder="Año" />
			</SelectTrigger>
			<SelectContent>
				{years.map((year) => (
					<SelectItem key={year} value={year}>
						{year}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
