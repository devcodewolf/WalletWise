'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user-store';
import { logOut } from '@/actions/logout';

export function useLogout() {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const handleLogout = async () => {
    try {
      const data = await logOut();
      
      if (data?.success) {
        clearUser();
        toast.success('Sesión cerrada correctamente');
        router.push('/');
        return { success: true };
      }

      if (data?.error) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
      return { error: 'Error al cerrar sesión' };
    }
  };

  return { handleLogout };
}
