'use client';

import * as React from 'react';
import { es } from 'date-fns/locale';

import { Calendar } from '@/components/ui/calendar';

export default function Calendar01() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode="single"
			defaultMonth={date}
			selected={date}
			onSelect={setDate}
			className="w-full bg-transparent"
			locale={es}
			formatters={{
				formatWeekdayName: (date) => {
					return date.toLocaleDateString('es-ES', { weekday: 'narrow' });
				},
			}}
		/>
	);
}
