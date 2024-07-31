import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import Site from "../models/Site";

interface IContextMenuInterface {
	x: number;
	y: number;
	toggled: boolean;
}

const defaultContextMenu = {
	x: 0,
	y: 0,
	toggled: false,
} as IContextMenuInterface;

interface IContextInterface {
	sites: Site[];
	addUpdateSite: (params: { title: string; url: string }, index?: number) => void;
	contextMenu: IContextMenuInterface;
	setContextMenu: Dispatch<SetStateAction<IContextMenuInterface>>;
	defaultContextMenu: IContextMenuInterface;
	removeSite: (i: number) => void;
}

const defaultState = {
	sites: [],
	addUpdateSite: () => {},
	contextMenu: defaultContextMenu,
	setContextMenu: () => {},
	defaultContextMenu: defaultContextMenu,
	removeSite: () => {},
} as IContextInterface;

export const TopSiteContext = createContext<IContextInterface>(defaultState);

const TopSiteContextProvider = ({ children }: { children?: ReactNode }) => {
	const [sites, setSites] = useState<Site[]>(defaultState.sites);
	const [contextMenu, setContextMenu] =
		useState<IContextMenuInterface>(defaultContextMenu);

	useEffect(() => {
		if (localStorage.getItem("topSites") !== null)
			setSites(Site.fromStorage(localStorage.getItem("topSites")!));
	}, []);

	function addUpdateSite(params: { title: string; url: string }, index?: number) {
		setSites((prevSites) => {
			if (index !== undefined) {
				var updatedSites = prevSites.map((site, i) =>
					i === index ? Site.getAddSite(params) : site,
				);
			} else {
				var updatedSites = [...prevSites, Site.getAddSite(params)];
			}
			localStorage.setItem("topSites", JSON.stringify(updatedSites));
			return updatedSites;
		});
	}

	function removeSite(index: number) {
		setSites((prevSites) => {
			const updatedSites = [...prevSites];
			updatedSites.splice(index, 1);
			// localStorage.setItem("topSites", JSON.stringify(updatedSites)); //! Remove comments
			return updatedSites;
		});
		setContextMenu(defaultContextMenu);
	}

	const contextValue: IContextInterface = {
		sites,
		addUpdateSite,
		contextMenu,
		setContextMenu,
		defaultContextMenu,
		removeSite,
	};
	return (
		<TopSiteContext.Provider value={contextValue}>{children}</TopSiteContext.Provider>
	);
};

export default TopSiteContextProvider;
