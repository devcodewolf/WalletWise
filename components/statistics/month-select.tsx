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
			<SelectTrigger className="flex-1 bg-gray-800 border-gray-700 text-white text-sm">
				<SelectValue />
			</SelectTrigger>
			<SelectContent className="bg-gray-800 border-gray-700">
				{months.map((month) => (
					<SelectItem
						key={month.value}
						value={month.value}
						className="text-white hover:bg-gray-700">
						{month.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
