'use client';

import * as React from 'react';
import { CircleDollarSign, Home, Inbox, PiggyBank, Wallet } from 'lucide-react';

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
		// {
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUserStore();

	return (
		<Sidebar>
			<SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.items} />
				{/* <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>{user && <NavUser {...user} />}</SidebarFooter>
		</Sidebar>
	);
}
