import { auth } from '@/auth';
import { LoginForm } from '@/components/login-form';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Login() {
	const session = await auth();

	if (session) {
		return redirect('/admin-panel');
	}

	return (
		<div className="container mx-auto h-dvh w-full p-6 lg:p-10">
			<Image
				src="/img/bg-login.jpg"
				width={1920}
				height={1080}
				className="w-full h-full object-cover absolute top-0 left-0 -z-1"
				loading="lazy"
				alt=""
			/>

			<div className="bg-card/50 w-full rounded-3xl grid md:grid-cols-2 h-full">
				<div className="flex items-center px-20 md:px-10 lg:px-20 py-10 xl:px-40">
					<div>
						<div className="text-center mb-15">
							<Image
								src="/img/logo3.webp"
								className="mx-auto mb-2"
								width={100}
								height={100}
								alt=""
							/>
							<h1 className="text-md">
								<span className="font-bold">WalletWise</span> <br />
							</h1>
							<p className="text-sm">
								Una aplicación moderna, intuitiva y potente para tomar el
								control de tus finanzas personales.
							</p>
						</div>
						<div className="text-center mb-10">
							<h1 className="text-3xl font-bold">Bienvenido</h1>
							<p>Ingresa email y contraseña para acceder a tu cuenta.</p>
						</div>
						<LoginForm className="" />
					</div>
				</div>

				<div className="overflow-hidden p-2 hidden md:block">
					<Image
						width={500}
						height={500}
						src="/img/bg-login.webp"
						className="w-full h-full rounded-3xl object-cover"
						alt=""
					/>
				</div>
			</div>

			{/* <div className="md:max-w-3xs text-center bg-black/30 p-4 rounded-md backdrop-blur-2xl">
				<Image
					src="/img/logo3.webp"
					className="mx-auto mb-2"
					width={50}
					height={50}
					alt=""
				/>
				<h1 className="text-sm">
					<span className="font-bold">WalletWise</span> <br />
				</h1>
				<p className="text-xs ">
					Una aplicación moderna, intuitiva y potente para tomar el control de
					tus finanzas personales.
				</p>
			</div> */}
		</div>
	);
}
