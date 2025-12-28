'use client'

import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { updateRecurringTransaction } from '@/actions/recurring'
import { RecurringForm } from './recurring-form'
import { RecurringFormSchema } from '@/lib/schemas/recurring'
import { RecurringTransactionWithRelations } from '@/types/transactions.types'

interface EditRecurringProps {
	recurring: RecurringTransactionWithRelations
}

export function EditRecurring({ recurring }: EditRecurringProps) {
	const handleSubmit = async (values: RecurringFormSchema) => {
		const result = await updateRecurringTransaction(recurring.id, values)
		return { success: !!result.success }
	}

	return (
		<RecurringForm
			mode='edit'
			recurring={recurring}
			onSubmit={handleSubmit}
			triggerButton={
				<Button variant='ghost' size='sm'>
					<Edit className='h-4 w-4' />
				</Button>
			}
			dialogTitle='Editar Recurrencia'
			dialogDescription='Modifica los detalles de este movimiento recurrente.'
			submitButtonText='Guardar Cambios'
		/>
	)
}
