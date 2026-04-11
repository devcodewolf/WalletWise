'use client';

import * as React from 'react';
import {
	BarChart3,
	CircleDollarSign,
	Home,
	Inbox,
	Repeat1,
	Wallet,
} from 'lucide-react';

import { NavMain } from '@/components/sidebar/nav-main';

import { NavUser } from '@/components/sidebar/nav-user';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from '@/components/ui/sidebar';
import { useUserStore } from '@/store/user-store';
import Image from 'next/image';

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
};

export function AppSidebar() {
	const { user } = useUserStore();

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader>
				{/* <TeamSwitcher teams={data.teams} /> */}
				<div className="flex items-center group-data-[state=collapsed]:hidden">
					<Image
						src="/img/logoBlack.webp"
						width={150}
						height={150}
						className="object-contain mx-auto dark:hidden"
						alt=""
					/>
					<Image
						src="/img/logoWhite.webp"
						width={150}
						height={150}
						className="object-contain mx-auto hidden dark:block"
						alt=""
					/>
				</div>
				{/* logo collapse */}
				<div className="hidden group-data-[state=collapsed]:block">
					<Image
						src="/img/logoMini.webp"
						width={40}
						height={40}
						className="object-contain mx-auto"
						alt=""
					/>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.items} />
				{/* <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>{user && <NavUser {...user} />}</SidebarFooter>
		</Sidebar>
	);
}
