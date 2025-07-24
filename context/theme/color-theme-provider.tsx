'use client';
import { ColorTheme } from '@/types/color.types';
import React, { useState, useEffect, ReactNode } from 'react';
import { ColorThemeContext } from './color-theme-context';

export function ColorThemeProvider({ children }: { children: ReactNode }) {
	const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
		if (typeof window !== 'undefined') {
			return (localStorage.getItem('color-theme') as ColorTheme) || 'default';
		}
		return 'default';
	});

	useEffect(() => {
		document.documentElement.classList.remove(
			'theme-caffeine',
			'theme-default',
			'theme-cosmic-night',
			'theme-claude'
		);
		document.documentElement.classList.add(`theme-${colorTheme}`);
		localStorage.setItem('color-theme', colorTheme);
	}, [colorTheme]);

	return (
		<ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
			{children}
		</ColorThemeContext.Provider>
	);
}
