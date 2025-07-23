'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/lib/schemas/singIn';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { FormError } from './FormError';
import { login } from '@/actions/login';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const router = useRouter();
	const [error, setError] = useState<string | undefined>('');

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: 'admin@admin.com',
			password: '123456',
		},
	});

	const onSubmit = (values: z.infer<typeof signInSchema>) => {
		try {
			login(values).then((data) => {
				console.log(data);
				setError(data?.error);
				if (data?.success) {
					toast('Logged in successfully');
					router.push('/admin-panel');
				}
			});
		} catch (error) {
			console.log(error);
			toast('Error logging in');
		}
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Ingrese su correo electrónico a continuación para iniciar sesión en
						su cuenta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-4 my-5">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Correo electrónico</FormLabel>
										<FormControl>
											<Input
												type="email"
												{...field}
												placeholder="m@example.com"
												required
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contraseña</FormLabel>
										<FormControl>
											<Input
												placeholder="Contraseña"
												{...field}
												type="password"
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							{error && <FormError message={error} />}
							<Button type="submit">Iniciar sesión</Button>
							{/* <Button variant="outline" className="w-full">
								Login with Google
							</Button> */}
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
