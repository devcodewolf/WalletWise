'use client';

import { Button } from '@/components/ui/button';
import { Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useColorTheme } from '@/hooks/use-color-theme';
import { ColorTheme } from '@/types/color.types';

type ThemeOption = {
	key: string;
	label: string;
	primaryColor: string;
	primaryForeground: string;
	accentColor: string;
};

const themes: ThemeOption[] = [
	{
		key: 'default',
		label: 'Claymorphism',
		primaryColor: 'bg-[#6366f1] dark:bg-[#818cf8]',
		primaryForeground: 'bg-[#f3e5f5] dark:bg-[#484441]',
		accentColor: 'bg-[#d6d3d1] dark:bg-[#3a3633]',
	},
	{
		key: 'caffeine',
		label: 'Caffeine',
		primaryColor: 'bg-[#644a40] dark:bg-[#ffe0c2]',
		primaryForeground: 'bg-[#e8e8e8] dark:bg-[#2a2a2a]',
		accentColor: 'bg-[#ffdfb5] dark:bg-[#393028]',
	},
	{
		key: 'cosmic-night',
		label: 'Cosmic Night',
		primaryColor: 'bg-[#6e56cf] dark:bg-[#a48fff]',
		primaryForeground: 'bg-[#d8e6ff] dark:bg-[#303060]',
		accentColor: 'bg-[#e4dfff] dark:bg-[#2d2b55]',
	},
	{
		key: 'claude',
		label: 'Claude',
		primaryColor: 'bg-[#c96442] dark:bg-[#d97757]',
		primaryForeground: 'bg-[#e9e6dc] dark:bg-[#1a1915]',
		accentColor: 'bg-[#dad9d4] dark:bg-[#faf9f5]',
	},
];

export function ColorThemeToggle() {
	const { colorTheme, setColorTheme } = useColorTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
					<div className="flex items-center gap-2">
						<Palette className="h-4 w-4" />
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				{themes.map((theme) => (
					<DropdownMenuItem
						key={theme.key}
						onClick={() => setColorTheme(theme.key as ColorTheme)}
						className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="flex gap-0.5">
								<div
									className={cn(
										'size-3 rounded-full border',
										theme.primaryColor
									)}
								/>
								<div
									className={cn(
										'size-3 rounded-full border',
										theme.primaryForeground
									)}
								/>
								<div
									className={cn(
										'size-3 rounded-full border',
										theme.accentColor
									)}
								/>
							</div>
							<span className="text-sm">{theme.label}</span>
						</div>
						{colorTheme === theme.key && (
							<Check className="h-4 w-4 text-primary" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
