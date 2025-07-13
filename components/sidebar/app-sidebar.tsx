'use client';

import * as React from 'react';
import {
	BarChart3,
	CircleDollarSign,
	Home,
	Inbox,
	PiggyBank,
	Wallet,
} from 'lucide-react';

import { NavMain } from '@/components/sidebar/nav-main';

import { NavUser } from '@/components/sidebar/nav-user';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';
import { useUserStore } from '@/store/user-store';

// This is sample data.
const data = {
	items: [
		{
			title: 'Dashboard',
			url: '/admin-panel',
			icon: Home,
		},
		{
			title: 'Categories',
			url: '/admin-panel/categories',
			icon: Inbox,
		},
		{
			title: 'Wallets',
			url: '/admin-panel/wallets',
			icon: Wallet,
		},
		{
			title: 'Transactions',
			url: '/admin-panel/transactions',
			icon: CircleDollarSign,
		},
		{
			title: 'Statistics',
			url: '/admin-panel/statistics',
			icon: BarChart3,
		},
		// {
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUserStore();

	return (
		<Sidebar>
			<SidebarHeader>
				{/* <TeamSwitcher teams={data.teams} /> */}
				<div className="flex items-center ">
					<img
						src="/img/logo3.webp"
						className="h-18 w-18 object-contain"
						alt=""
					/>
					<p className="text-lg  leading-5 color-[#10b981]">
						Wallet<span className="text-[#3972bf] font-semibold">Wise</span>
					</p>
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
