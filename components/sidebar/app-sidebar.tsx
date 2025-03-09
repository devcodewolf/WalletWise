'use client';

import * as React from 'react';
import { Home, Inbox, Wallet } from 'lucide-react';

import { NavMain } from '@/components/sidebar/nav-main';

import { NavUser } from '@/components/sidebar/nav-user';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';

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
			url: '#',
			icon: Wallet,
		},
		// {
		// 	title: 'Search',
		// 	url: '#',
		// 	icon: Search,
		// },
		// {
		// 	title: 'Settings',
		// 	url: '#',
		// 	icon: Settings,
		// },
	],
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar>
			<SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.items} />
				{/* <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
