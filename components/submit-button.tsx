'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends React.ComponentProps<'button'> {
	isSubmitting: boolean;
	submittingText?: string;
	children: React.ReactNode;
}

export function SubmitButton({
	isSubmitting,
	submittingText = 'Guardando...',
	children,
	className,
	...props
}: SubmitButtonProps) {
	return (
		<Button
			type="submit"
			disabled={isSubmitting}
			className={cn(className)}
			{...props}>
			{isSubmitting ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					{submittingText}
				</>
			) : (
				children
			)}
		</Button>
	);
}
