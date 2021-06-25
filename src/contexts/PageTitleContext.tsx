import { useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';

type PageTitleContextType = {
	handleTitleChange: (newTitle: string) => void;
}

type PageTitleContextProviderProps = {
	children: ReactNode;
}

export const PageTitleContext = createContext({} as PageTitleContextType);

export function PageTitleContextProvider({ children }: PageTitleContextProviderProps) {
	const [title, setTitle] = useState('Letmeask');

	function handleTitleChange(newTitle: string) {
		setTitle(newTitle);
	}

	useEffect(() => {
		document.title = title;
	}, [title]);

	return (
		<PageTitleContext.Provider
			value={{ handleTitleChange }}
		>
			{children}
		</PageTitleContext.Provider>
	)
}