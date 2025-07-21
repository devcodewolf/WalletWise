'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

interface MonthSelectProps {
	value: string;
	onChange: (value: string) => void;
	months: { value: string; label: string }[];
}

export function MonthSelect({ value, onChange, months }: MonthSelectProps) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent className="">
				{months.map((month) => (
					<SelectItem key={month.value} value={month.value} className="">
						{month.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
