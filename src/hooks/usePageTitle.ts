import { useContext } from "react";
import { PageTitleContext } from "../contexts/PageTitleContext";

export function usePageTitle() {
	const value = useContext(PageTitleContext);
	return value;
}