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
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<Image
				src="img/bg-login.jpg"
				className="w-full h-full object-cover absolute top-0 left-0 -z-1"
				loading="lazy"
				alt=""
			/>
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
