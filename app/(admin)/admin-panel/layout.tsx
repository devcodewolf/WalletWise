import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { auth } from '@/auth';
// import { redirect } from 'next/navigation';
import { AdminUserStore } from '@/components/AdminUserStore';
import Header from '@/components/header/header';
import { SessionExpiredModal } from '@/components/auth/SessionExpiredModal';
import { SessionProvider } from 'next-auth/react';

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	// if (!session || !session?.user || !session?.user?.id) {
	// 	return redirect('/');
	// }

	return (
		<>
			<SidebarProvider
				style={
					{
						'--sidebar-width': 'calc(var(--spacing) * 50)',
						'--header-height': 'calc(var(--spacing) * 12)',
					} as React.CSSProperties
				}>
				{/* opcion para poder hacerlo en un server component */}
				<AdminUserStore user={session?.user} />
				<AppSidebar />
				<SidebarInset className="px-6 pb-4 overflow-x-hidden">
					<Header />
					<SessionProvider>
						<SessionExpiredModal></SessionExpiredModal>
					</SessionProvider>
					{children}
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
