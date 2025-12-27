import { RefreshCw } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { AddRecurring } from './add-recurring'

export default function HeaderRecurring() {
	return (
		<div className='block md:flex md:flex-row items-center p-0'>
			<div className='mb-3 md:mb-0'>
				<h2 className='text-2xl font-bold flex items-center gap-2'>
					<RefreshCw className='size-6' />
					<Separator
						orientation='vertical'
						className='data-[orientation=vertical]:h-6'
					/>
					Movimientos Recurrentes
				</h2>
				<p className='text-gray-400 mt-1'>
					Gestiona tus pagos y cobros recurrentes
				</p>
			</div>
			<AddRecurring />
		</div>
	)
}
