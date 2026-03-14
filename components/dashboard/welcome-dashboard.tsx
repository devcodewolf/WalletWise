import { getCurrentUser } from '@/lib/auth-utils'

export const WelcomeDashboard = async () => {
	const user = await getCurrentUser()

	return (
		<>
			<div className='text-3xl font-bold'>Bienvenido {user?.name}</div>
			<p className='text-muted-foreground mt-1'>
				Hecha un vistazo 👀 a tu resumen de gastos.
			</p>
			<p className='text-sm pt-3'>
				Los datos se comparan con los 3 últimos meses de gastos e ingresos para
				dar un resúmen de las situación financiera.
			</p>
		</>
	)
}
