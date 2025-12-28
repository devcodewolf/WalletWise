'use client'

import * as React from 'react'
import {
	BarChart3,
	CircleDollarSign,
	Home,
	Inbox,
	Repeat1,
	Wallet,
} from 'lucide-react'

import { NavMain } from '@/components/sidebar/nav-main'

import { NavUser } from '@/components/sidebar/nav-user'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from '@/components/ui/sidebar'
import { useUserStore } from '@/store/user-store'
import Image from 'next/image'

// This is sample data.
const data = {
	items: [
		{
			title: 'Dashboard',
			url: '/admin-panel',
			icon: Home,
		},
		{
			title: 'Categorias',
			url: '/admin-panel/categories',
			icon: Inbox,
		},
		{
			title: 'Billeteras',
			url: '/admin-panel/wallets',
			icon: Wallet,
		},
		{
			title: 'Movimientos',
			url: '/admin-panel/transactions',
			icon: CircleDollarSign,
		},
		{
			title: 'Recurrentes',
			url: '/admin-panel/recurring',
			icon: Repeat1,
		},
		{
			title: 'Estadísticas',
			url: '/admin-panel/statistics',
			icon: BarChart3,
		},
		// {
	],
}

export function AppSidebar() {
	const { user } = useUserStore()

	return (
		<Sidebar variant='inset' collapsible='icon'>
			<SidebarHeader>
				{/* <TeamSwitcher teams={data.teams} /> */}
				<div className='flex items-center '>
					<Image
						src='/img/logo3.webp'
						width={100}
						height={100}
						className='h-18 w-18 object-contain'
						alt=''
					/>
					<p className='text-lg leading-5 color-[#10b981] group-data-[collapsible=icon]:hidden'>
						Wallet<span className='text-[#3972bf] font-semibold'>Wise</span>
					</p>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.items} />
				{/* <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>{user && <NavUser {...user} />}</SidebarFooter>
		</Sidebar>
	)
}
