'use client';

import * as React from 'react';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

interface Calendar01Props {
	className?: string;
}

export default function Calendar01({ className }: Calendar01Props) {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			className={cn('w-full bg-transparent p-0', className)}
			locale={es}
			formatters={{
				formatWeekdayName: (date) => {
					return date.toLocaleDateString('es-ES', { weekday: 'narrow' });
				},
			}}
		/>
	);
}
