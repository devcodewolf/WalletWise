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
import { Category } from '@/types';
import { IconSelector } from './icon-selector';
import { useState } from 'react';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Category name must be at least 2 characters.',
	}),
	type: z.enum(['Expense', 'Income']),
	iconName: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCategoryProps {
	onAddCategory: (category: Omit<Category, 'id'>) => void;
}

export function AddCategory({ onAddCategory }: AddCategoryProps) {
	const [open, setOpen] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			type: 'Expense',
			iconName: 'ShoppingBag',
		},
	});

	function onSubmit(values: FormValues) {
		onAddCategory(values);
		form.reset();
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="ml-auto flex">
					<PlusCircle className="mr-2 h-4 w-4" />
					Add Category
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Category</DialogTitle>
					<DialogDescription>
						Create a new category for tracking your expenses or income.
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
										<Input placeholder="Category name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<FormControl>
										<div className="flex gap-4">
											<Button
												type="button"
												variant={
													field.value === 'Expense' ? 'default' : 'outline'
												}
												className="flex-1"
												onClick={() => field.onChange('Expense')}>
												Expense
											</Button>
											<Button
												type="button"
												variant={
													field.value === 'Income' ? 'default' : 'outline'
												}
												className="flex-1"
												onClick={() => field.onChange('Income')}>
												Income
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="iconName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon</FormLabel>
									<FormControl>
										<IconSelector
											selectedIcon={field.value}
											onSelectIcon={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Save Category</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
