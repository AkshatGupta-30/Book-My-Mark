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
	index: number;
	toggled: boolean;
}

const defaultContextMenu = {
	x: 0,
	y: 0,
	index: 0,
	toggled: false,
} as IContextMenuInterface;

interface IContextInterface {
	sites: Site[];
	addSite: (params: { title: string; url: string }) => void;
	contextMenu: IContextMenuInterface;
	setContextMenu: Dispatch<SetStateAction<IContextMenuInterface>>;
	defaultContextMenu: IContextMenuInterface;
	removeSite: (i: number) => void;
}

const defaultState = {
	sites: [],
	addSite: () => {},
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

	function addSite(params: { title: string; url: string }) {
		setSites([...sites, Site.getAddSite(params)]);
		localStorage.setItem(
			"topSites",
			JSON.stringify([...sites, Site.getAddSite(params)]),
		);
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
		addSite,
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
