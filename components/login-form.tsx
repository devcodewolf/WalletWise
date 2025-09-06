'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/lib/schemas/singIn';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
import { Loader2, Eye, EyeOff } from 'lucide-react';

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const router = useRouter();
	const [error, setError] = useState<string | undefined>('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: 'test@test.com',
			password: '123456',
		},
	});

	const onSubmit = async (values: z.infer<typeof signInSchema>) => {
		try {
			setIsSubmitting(true);
			setError(undefined);

			const data = await login(values);
			console.log('Respuesta del login desde server action:', data);

			if (data?.error) {
				setError(data.error);
				toast.error(data.error);
				setIsSubmitting(false);
				return;
			}

			if (data?.success) {
				toast.success('Sesión iniciada con éxito');
				router.push('/admin-panel');
			}
		} catch (error) {
			console.error('Error en onSubmit:', error);
			toast.error(
				error instanceof Error ? error.message : 'Error al iniciar sesión'
			);
		} finally {
			if (!router) {
				// Solo establecer a false si aún estamos en la página
				setIsSubmitting(false);
			}
		}
	};

	return (
		<div className={cn(className)} {...props}>
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
									<div className="relative">
										<Input
											placeholder="Contraseña"
											{...field}
											type={showPassword ? 'text' : 'password'}
											className="pr-10"
										/>
										<button
											type="button"
											className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
											onClick={() => setShowPassword((v) => !v)}
											aria-label={
												showPassword
													? 'Ocultar contraseña'
													: 'Mostrar contraseña'
											}
											title={
												showPassword
													? 'Ocultar contraseña'
													: 'Mostrar contraseña'
											}>
											{showPassword ? (
												<EyeOff className="h-4 w-4" aria-hidden="true" />
											) : (
												<Eye className="h-4 w-4" aria-hidden="true" />
											)}
										</button>
									</div>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{error && <FormError message={error} />}
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Iniciando...
							</>
						) : (
							'Iniciar sesión'
						)}
					</Button>
					{/* <Button variant="outline" className="w-full">
								Login with Google
							</Button> */}
				</form>
			</Form>
		</div>
	);
}
