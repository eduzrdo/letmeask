import { useContext } from "react";
import { DarkThemeContext } from "../contexts/DarkThemeContext";

export function useTheme() {
	const value = useContext(DarkThemeContext);
	return value;
}