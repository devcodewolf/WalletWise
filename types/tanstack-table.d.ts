// types/tanstack-table.d.ts
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
	// Extiende el tipo ColumnMeta para tus columnas
	interface ColumnMeta<TData extends unknown = unknown, TValue = unknown> {
		label?: string;
	}
}
