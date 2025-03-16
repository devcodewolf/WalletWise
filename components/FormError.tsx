import { AlertCircle } from 'lucide-react';

type ErrorProps = {
	message?: string;
};

export function FormError(props: ErrorProps) {
	return (
		<div className="bg-red-500 px-3 py-2 flex items-center gap-2 text-sm">
			<AlertCircle />
			{props.message}
		</div>
	);
}
