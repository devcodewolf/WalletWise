'use server';

import { signOut } from '@/auth';

export const logOut = async () => {
	try {
		await signOut({ redirect: false });
		return { success: true };
	} catch (error) {
		console.log(error);
		return { error: error, success: false };
	}
};
