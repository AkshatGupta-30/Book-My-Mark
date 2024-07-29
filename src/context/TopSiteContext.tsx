import React, { createContext, ReactNode, useState } from "react";
import Site from "../models/Site";

interface ContextInterface {
	sites: Site[];
	addSite: (params: { title: string; url: string }) => void;
}

const defaultState = {
	sites: [],
	addSite: () => {},
} as ContextInterface;

export const TopSiteContext = createContext<ContextInterface>(defaultState);

const TopSiteContextProvider = ({ children }: { children?: ReactNode }) => {
	const [sites, setSites] = useState<Site[]>(defaultState.sites);

	function addSite(params: { title: string; url: string }) {
		setSites([...sites, Site.getAddSite(params)]);
	}

	const contextValue: ContextInterface = { sites: sites, addSite };
	return (
		<TopSiteContext.Provider value={contextValue}>{children}</TopSiteContext.Provider>
	);
};

export default TopSiteContextProvider;
