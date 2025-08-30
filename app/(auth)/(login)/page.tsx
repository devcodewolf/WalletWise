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
		<div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-4 min-h-dvh w-full p-6 md:p-10">
			<Image
				src="/img/bg-login.jpg"
				width={1920}
				height={1080}
				className="w-full h-full object-cover absolute top-0 left-0 -z-1"
				loading="lazy"
				alt=""
			/>

			<div className="md:max-w-3xs text-center bg-black/30 p-4 rounded-md backdrop-blur-2xl">
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
			</div>

			<div className="w-full  flex justify-center items-center">
				<LoginForm className="max-w-md" />
			</div>
		</div>
	);
}
