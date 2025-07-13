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
			<SelectTrigger className="w-20 bg-gray-800 border-gray-700 text-white text-sm">
				<SelectValue />
			</SelectTrigger>
			<SelectContent className="bg-gray-800 border-gray-700">
				{years.map((year) => (
					<SelectItem
						key={year}
						value={year}
						className="text-white hover:bg-gray-700">
						{year}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
