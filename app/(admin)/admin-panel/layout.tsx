import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import {
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminUserStore } from '@/components/AdminUserStore';

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session || !session?.user || !session?.user?.id) {
		return redirect('/');
	}

	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': 'calc(var(--spacing) * 50)',
					'--header-height': 'calc(var(--spacing) * 12)',
				} as React.CSSProperties
			}>
			{/* opcion para poder hacerlo en un server component */}
			<AdminUserStore user={session.user} />
			<AppSidebar />
			<SidebarInset className="px-6 pb-4 overflow-x-hidden">
				<header className="flex h-12 shrink-0  items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="data-[orientation=vertical]:h-4"
						/>
					</div>
					<ThemeToggle />
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
