'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/user-store';
import { User } from 'next-auth';

export function AdminUserStore({ user }: { user?: User }) {
	const { setUser } = useUserStore();

	useEffect(() => {
		if (user) setUser(user);
	}, [user, setUser]);

	return null; // No necesita renderizar nada
}
