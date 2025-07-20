import { Prisma } from '@prisma/client';

// Define el tipo extendido con las relaciones
export type TransactionWithRelations = Prisma.TransactionGetPayload<{
	include: {
		wallet: true;
		category: true;
	};
}>;
