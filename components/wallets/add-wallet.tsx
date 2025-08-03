'use client';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { PlusCircle, Loader2 } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSubmit } from '@/hooks/use-form-submit';

import { Button } from '@/components/ui/button';
import { SubmitButton } from '@/components/submit-button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { createWallet } from '@/actions/wallets';
import { WalletsFormSchema, walletsSchema } from '@/lib/schemas/wallets';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function AddWallet() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { isSubmitting, handleSubmit: submitWithState } =
		useFormSubmit<WalletsFormSchema>();

	const form = useForm<WalletsFormSchema>({
		resolver: zodResolver(walletsSchema),
		defaultValues: {
			name: '',
			initialBalance: 0,
		},
	});

	async function handleSubmit(values: WalletsFormSchema) {
		const success = await submitWithState(values, createWallet, {
			successMessage: 'Cartera creada con éxito',
			errorMessage: 'Error al crear la cartera',
		});

		if (success) {
			form.reset();
			setOpen(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="ml-auto flex">
					<PlusCircle className=" h-4 w-4" />
					Nuevo wallet
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Añadir nuevo wallet</DialogTitle>
					<DialogDescription>
						Añade un nuevo wallet para rastrear tus gastos e ingresos.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input placeholder="Wallet name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="initialBalance"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Saldo inicial</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="0.00"
											step="0.01"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<SubmitButton isSubmitting={isSubmitting}>
								Crear wallet
							</SubmitButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
