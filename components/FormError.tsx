import { AlertCircle } from 'lucide-react';

type ErrorProps = {
	message?: string;
};

export function FormError(props: ErrorProps) {
	return (
		<div className="bg-rose-500 text-white px-3 py-2 flex items-center gap-2 leading-0 text-sm">
			<AlertCircle />
			{props.message}
		</div>
	);
}
