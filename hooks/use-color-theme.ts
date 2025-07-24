import { ColorThemeContext } from '@/context/theme/color-theme-context';
import { useContext } from 'react';

export function useColorTheme() {
	const ctx = useContext(ColorThemeContext);
	if (!ctx)
		throw new Error('useColorTheme debe usarse dentro de ColorThemeProvider');
	return ctx;
}
