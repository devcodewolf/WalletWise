'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/user-store';

export function AdminUserStore({ user }: { user: any }) {
	const { setUser } = useUserStore();

	useEffect(() => {
		setUser(user);
	}, [user, setUser]);

	return null; // No necesita renderizar nada
}
