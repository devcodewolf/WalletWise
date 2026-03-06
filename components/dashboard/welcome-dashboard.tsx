import { getCurrentUser } from '@/lib/auth-utils'

export const WelcomeDashboard = async () => {
	const user = await getCurrentUser()

	return (
		<>
			<div className='text-3xl font-bold'>Bienvenido {user?.name}</div>
			<p className='text-gray-400 mt-1'>
				Hecha un vistazo 👀 a tu resumen de gastos
			</p>
		</>
	)
}
