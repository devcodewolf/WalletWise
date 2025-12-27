'use client'

import { createRecurringTransaction } from '@/actions/recurring'
import { Button } from '@/components/ui/button'
import { RecurringFormSchema } from '@/lib/schemas/recurring'
import { PlusCircle } from 'lucide-react'
import { RecurringForm } from './recurring-form'

export function AddRecurring() {
	async function onSubmit(values: RecurringFormSchema) {
		const result = await createRecurringTransaction(values)
		return { success: !!result.success }
	}

	return (
		<RecurringForm
			mode='create'
			onSubmit={onSubmit}
			triggerButton={
				<Button className='ml-auto flex'>
					<PlusCircle className='size-4' />
					<p className='leading-0'>Nueva Recurrencia</p>
				</Button>
			}
			dialogTitle='Añadir Movimiento Recurrente'
			dialogDescription='Crea una nueva regla para movimientos que se repiten mensual o anualmente.'
			submitButtonText='Crear Recurrencia'
		/>
	)
}
