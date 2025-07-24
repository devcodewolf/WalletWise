import { ColorTheme } from '@/types/color.types';
import { createContext } from 'react';

interface ColorThemeContextProps {
	colorTheme: ColorTheme;
	setColorTheme: (theme: ColorTheme) => void;
}

export const ColorThemeContext = createContext<
	ColorThemeContextProps | undefined
>(undefined);
