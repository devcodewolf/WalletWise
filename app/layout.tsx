import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/src/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ColorThemeProvider } from '@/context/theme/color-theme-provider';
import { ToasterProvider } from '@/components/toaster-provider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'WalletWise',
	description:
		'Una aplicación moderna, intuitiva y potente para tomar el control de tus finanzas personales.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ColorThemeProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
						{children}
					</ThemeProvider>
				</ColorThemeProvider>
				<ToasterProvider />
			</body>
		</html>
	);
}
