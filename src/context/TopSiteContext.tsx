import { createContext, ReactNode, useState } from "react";
import Site from "../models/Site";

interface ContextInterface {
	topSites: Site[];
}

const defaultState = {
	topSites: [],
} as ContextInterface;

export const TopSiteContext = createContext<ContextInterface>(defaultState);

const TopSiteContextProvider = ({ children }: { children?: ReactNode }) => {
	const [topSites, setTopSites] = useState<Site[]>(defaultState.topSites);

	const contextValue: ContextInterface = { topSites };
	return (
		<TopSiteContext.Provider value={contextValue}>{children}</TopSiteContext.Provider>
	);
};

export default TopSiteContextProvider;
