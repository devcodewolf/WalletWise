'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TOKEN_MAX_AGE } from '@/auth';

const expirationTime = TOKEN_MAX_AGE; // 15 minutos

export function SessionExpiredModal() {
	const { data: session, status } = useSession();
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (status === 'authenticated' && session?.user) {
			const expiresIn = expirationTime * 1000; // milisegundos
			const timeout = setTimeout(() => {
				setOpen(true);
			}, expiresIn);
			return () => clearTimeout(timeout);
		}
	}, [status, session, pathname]);

	const handleGoHome = () => {
		// setOpen(false);
		router.push('/');
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent
					onInteractOutside={(e) => e.preventDefault()}
					showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>Sesión expirada</DialogTitle>
						<DialogDescription>
							Tu sesión ha caducado. Por favor, inicia sesión nuevamente para
							continuar.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={handleGoHome}>Volver al inicio</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
