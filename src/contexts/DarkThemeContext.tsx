import { useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';

type DarkThemeContextType = {
	theme: string;
	handleToggleTheme: () => void;
}

type DarkThemeContextProviderProps = {
	children: ReactNode;
}

type DarkThemeType = 'light-theme' | 'dark-theme';

export const DarkThemeContext = createContext({} as DarkThemeContextType);

export function DarkThemeContextProvider({ children }: DarkThemeContextProviderProps) {
	const [theme, setTheme] = useState<DarkThemeType>(() => {
		const localTheme = localStorage.getItem('theme');

		return (localTheme ?? 'light-theme') as DarkThemeType;
	});

	function handleToggleTheme() {
		setTheme(theme === 'dark-theme' ? 'light-theme' : 'dark-theme');
	}

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<DarkThemeContext.Provider
			value={{ theme, handleToggleTheme }}
		>
			{children}
		</DarkThemeContext.Provider>
	)
}