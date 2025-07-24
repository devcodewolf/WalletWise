'use client';

import { useLogout } from '@/hooks/use-logout';
import { Separator } from '@/components/ui/separator';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ColorThemeToggle } from '@/components/header/color-theme-toggle';
import { ThemeToggle } from '@/components/header/theme-toggle';

export default function Header() {
	const { handleLogout } = useLogout();

	return (
		<header className="flex h-12 shrink-0  items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="data-[orientation=vertical]:h-4"
				/>
			</div>
			<div className="flex items-center gap-2">
				<ThemeToggle />
				<ColorThemeToggle />
				<Button variant="ghost" size="icon" onClick={handleLogout}>
					<LogOut />
				</Button>
			</div>
		</header>
	);
}
