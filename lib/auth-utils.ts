'use server';

import { auth } from '@/auth';

/**
 * Obtiene el usuario actual de la sesión
 * @returns El usuario actual o null si no hay sesión
 */
export const getCurrentUser = async () => {
	const session = await auth();

	if (!session || !session.user || !session.user.id) {
		return null;
	}

	return session.user;
};

/**
 * Verifica si hay un usuario autenticado y devuelve un resultado estándar
 * @returns Un objeto con success y error si no hay usuario autenticado
 */
export const requireAuth = async () => {
	const user = await getCurrentUser();

	if (!user) {
		return { success: false, error: 'Unauthorized' };
	}

	return { success: true, user };
};
