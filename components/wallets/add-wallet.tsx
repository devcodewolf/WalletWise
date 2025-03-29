'use client';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
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

	const form = useForm<WalletsFormSchema>({
		resolver: zodResolver(walletsSchema),
		defaultValues: {
			name: '',
			initialBalance: 0,
		},
	});

	async function handleSubmit(values: WalletsFormSchema) {
		const response = await createWallet(values);
		console.log(response);
		if (!response.success) {
			toast.error((response as { error?: string }).error);
			return;
		}

		toast.success('Cartera creada con éxito');
		form.reset();
		setOpen(false);
		setTimeout(() => {
			router.refresh();
		}, 300);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="ml-auto flex">
					<PlusCircle className="mr-2 h-4 w-4" />
					Nuevo Wallet
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Wallet</DialogTitle>
					<DialogDescription>
						Create a new wallet for tracking your expenses and income.
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
									<FormLabel>Name</FormLabel>
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
									<FormLabel>Initial Balance</FormLabel>
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
							<Button type="submit">Save Wallet</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
