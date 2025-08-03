'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type SubmitHandler<T> = (values: T) => Promise<{ success?: boolean; error?: string }>;

interface UseFormSubmitOptions {
  successMessage?: string;
  errorMessage?: string;
  resetForm?: boolean;
  closeDialog?: boolean;
  refreshPage?: boolean;
  refreshDelay?: number;
}

export function useFormSubmit<T>() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    values: T,
    submitHandler: SubmitHandler<T>,
    options: UseFormSubmitOptions = {}
  ) => {
    const {
      successMessage = 'Operación completada con éxito',
      errorMessage = 'Ha ocurrido un error',
      resetForm = true,
      closeDialog = true,
      refreshPage = true,
      refreshDelay = 300
    } = options;

    setIsSubmitting(true);

    try {
      const response = await submitHandler(values);

      if (!response.success) {
        toast.error(response.error || errorMessage);
        return false;
      }

      toast.success(successMessage);
      
      if (refreshPage) {
        setTimeout(() => {
          router.refresh();
        }, refreshDelay);
      }

      return true;
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
}