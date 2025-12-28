'use client'

import { type LucideIcon } from 'lucide-react'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarGroupContent,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AddTransaction } from '../transactions/add-transaction'

type NavItemProps = {
	title: string
	url: string
	icon?: LucideIcon
	isActive?: boolean
}[]

export function NavMain({ items }: { items: NavItemProps }) {
	const pathname = usePathname()

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem className='group-data-[state=collapsed]:hidden'>
						<AddTransaction />
					</SidebarMenuItem>

					<SidebarGroupLabel>Opciones</SidebarGroupLabel>
					{items.map((item) => {
						const isActive = pathname === item.url
						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									isActive={isActive}
									tooltip={item.title}
									className={
										isActive ? 'bg-primary text-primary-foreground' : ''
									}>
									<Link href={item.url}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
