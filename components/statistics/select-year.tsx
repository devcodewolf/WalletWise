'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

interface YearSelectProps {
	value: string;
	onChange: (value: string) => void;
	years: string[];
}

export function YearSelect({ value, onChange, years }: YearSelectProps) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger>
				<SelectValue />
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
}
