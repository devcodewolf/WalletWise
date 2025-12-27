'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, RefreshCw } from 'lucide-react'
import { RecurringTransactionWithRelations } from '@/types/transactions.types'
import { EditRecurring } from './edit-recurring'
import { DeleteRecurring } from './delete-recurring'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<RecurringTransactionWithRelations>[] = [
	{
		accessorKey: 'description',
		meta: {
			label: 'Descripción',
		},
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Descripción
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const description = row.getValue('description') as string
			return (
				<div className='font-medium'>{description || 'Sin descripción'}</div>
			)
		},
	},
	{
		accessorKey: 'type',
		meta: {
			label: 'Tipo',
		},
		header: 'Tipo',
		cell: ({ row }) => {
			const type = row.getValue('type') as string
			return (
				<p className={type === 'Ingreso' ? 'text-red-600' : 'text-green-600'}>
					{type}
				</p>
			)
		},
	},
	{
		accessorKey: 'amount',
		meta: {
			label: 'Cantidad',
		},
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Cantidad
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			const type = row.original.type
			const formatted = new Intl.NumberFormat('es-ES', {
				style: 'currency',
				currency: 'EUR',
			}).format(amount)
			return (
				<div
					className={
						type === 'Gasto'
							? 'bg-red-100 text-red-600 rounded-full px-2 py-1 w-fit font-semibold text-xs'
							: 'bg-green-100 text-green-600 rounded-full px-2 py-1 w-fit font-semibold text-xs'
					}>
					{formatted}
				</div>
			)
		},
	},
	{
		accessorKey: 'frequency',
		meta: {
			label: 'Frecuencia',
		},
		header: 'Frecuencia',
		cell: ({ row }) => {
			const frequency = row.getValue('frequency') as string
			const dayOfMonth = row.original.dayOfMonth
			const label = frequency === 'MONTHLY' ? 'Mensual' : 'Anual'
			return (
				<div className='flex items-center gap-2'>
					<RefreshCw className='h-4 w-4 text-muted-foreground' />
					<span>
						{label} (Día {dayOfMonth})
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'category',
		meta: {
			label: 'Categoría',
		},
		header: 'Categoría',
		cell: ({ row }) => {
			const category = row.original.category
			return <div>{category?.name || '-'}</div>
		},
	},
	{
		accessorKey: 'wallet',
		meta: {
			label: 'Cartera',
		},
		header: 'Cartera',
		cell: ({ row }) => {
			const wallet = row.original.wallet
			return <div>{wallet?.name || '-'}</div>
		},
	},
	{
		accessorKey: 'isActive',
		meta: {
			label: 'Estado',
		},
		header: 'Estado',
		cell: ({ row }) => {
			const isActive = row.getValue('isActive') as boolean
			return (
				<Badge
					variant='secondary'
					className={isActive ? 'bg-green-600' : 'bg-red-600'}>
					{isActive ? 'Activa' : 'Inactiva'}
				</Badge>
			)
		},
	},
	{
		id: 'acciones',
		cell: ({ row }) => {
			const recurring = row.original
			return (
				<div className='flex justify-end gap-2'>
					<EditRecurring recurring={recurring} />
					<DeleteRecurring recurring={recurring} />
				</div>
			)
		},
	},
]
