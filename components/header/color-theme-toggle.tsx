'use client'

import { Button } from '@/components/ui/button'
import { Check, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useColorTheme } from '@/hooks/use-color-theme'
import { ColorTheme } from '@/types/color.types'

type ThemeOption = {
	key: string
	label: string
	primaryColor: string
	primaryForeground: string
	accentColor: string
}

const themes: ThemeOption[] = [
	{
		key: 'default',
		label: 'Default',
		primaryColor: 'bg-[#171717] dark:bg-[#e5e5e5]',
		primaryForeground: 'bg-[#fafafa] dark:bg-[#171717]',
		accentColor: 'bg-[#f5f5f5] dark:bg-[#404040]',
	},
	{
		key: 'caffeine',
		label: 'Caffeine',
		primaryColor: 'bg-[#644a40] dark:bg-[#ffe0c2]',
		primaryForeground: 'bg-[#e8e8e8] dark:bg-[#2a2a2a]',
		accentColor: 'bg-[#ffdfb5] dark:bg-[#393028]',
	},
	{
		key: 'ocean-breeze',
		label: 'Ocean Breeze',
		primaryColor: 'bg-[#22c55e] dark:bg-[#34d399]',
		primaryForeground: 'bg-[#ffffff] dark:bg-[#0f172a]',
		accentColor: 'bg-[#d1fae5] dark:bg-[#374151]',
	},
	{
		key: 'claude',
		label: 'Claude',
		primaryColor: 'bg-[#c96442] dark:bg-[#d97757]',
		primaryForeground: 'bg-[#e9e6dc] dark:bg-[#1a1915]',
		accentColor: 'bg-[#dad9d4] dark:bg-[#faf9f5]',
	},
]

export function ColorThemeToggle() {
	const { colorTheme, setColorTheme } = useColorTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='sm' className='h-8 gap-2 px-2'>
					<div className='flex items-center gap-2'>
						<Palette className='h-4 w-4' />
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-48'>
				{themes.map((theme) => (
					<DropdownMenuItem
						key={theme.key}
						onClick={() => setColorTheme(theme.key as ColorTheme)}
						className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='flex gap-0.5'>
								<div
									className={cn(
										'size-3 rounded-full border',
										theme.primaryColor,
									)}
								/>
								<div
									className={cn(
										'size-3 rounded-full border',
										theme.primaryForeground,
									)}
								/>
								<div
									className={cn(
										'size-3 rounded-full border',
										theme.accentColor,
									)}
								/>
							</div>
							<span className='text-sm'>{theme.label}</span>
						</div>
						{colorTheme === theme.key && (
							<Check className='h-4 w-4 text-primary' />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
