'use client';

import { useForm } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';
import * as z from 'zod';
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Wallet name must be at least 2 characters.',
	}),
	initialBalance: z.coerce.number().min(0, {
		message: 'Initial balance must be a positive number.',
	}),
});

type FormValues = z.infer<typeof formSchema>;

interface AddWalletProps {
	onAddWallet: (wallet: { name: string; initialBalance: number }) => void;
}

export function AddWallet({ onAddWallet }: AddWalletProps) {
	const [open, setOpen] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			initialBalance: 0,
		},
	});

	function onSubmit(values: FormValues) {
		onAddWallet(values);
		form.reset();
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="ml-auto flex">
					<PlusCircle className="mr-2 h-4 w-4" />
					Add Wallet
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
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
