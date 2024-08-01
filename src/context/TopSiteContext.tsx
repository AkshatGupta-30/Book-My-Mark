import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import Site from "../models/Site";

interface ISecondaryItemInterface {
	x: number;
	y: number;
	toggled: boolean;
}

const defaultSecondaryItem = {
	x: 0,
	y: 0,
	toggled: false,
} as ISecondaryItemInterface;

interface IContextInterface {
	sites: Site[];
	addUpdateSite: (params: { title: string; url: string }, index?: number) => void;
	contextMenu: ISecondaryItemInterface;
	setContextMenu: Dispatch<SetStateAction<ISecondaryItemInterface>>;
	floatCard: ISecondaryItemInterface;
	setFloatCard: Dispatch<SetStateAction<ISecondaryItemInterface>>;
	defaultSecondaryItem: ISecondaryItemInterface;
	removeSite: (i: number) => void;
}

const defaultState = {
	sites: [],
	addUpdateSite: () => {},
	contextMenu: defaultSecondaryItem,
	setContextMenu: () => {},
	floatCard: defaultSecondaryItem,
	setFloatCard: () => {},
	defaultSecondaryItem: defaultSecondaryItem,
	removeSite: () => {},
} as IContextInterface;

export const TopSiteContext = createContext<IContextInterface>(defaultState);

const TopSiteContextProvider = ({ children }: { children?: ReactNode }) => {
	const [sites, setSites] = useState<Site[]>(defaultState.sites);
	const [contextMenu, setContextMenu] =
		useState<ISecondaryItemInterface>(defaultSecondaryItem);
	const [floatCard, setFloatCard] =
		useState<ISecondaryItemInterface>(defaultSecondaryItem);

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
		setContextMenu(defaultSecondaryItem);
	}

	const contextValue: IContextInterface = {
		sites,
		addUpdateSite,
		contextMenu,
		setContextMenu,
		floatCard,
		setFloatCard,
		defaultSecondaryItem,
		removeSite,
	};
	return (
		<TopSiteContext.Provider value={contextValue}>{children}</TopSiteContext.Provider>
	);
};

export default TopSiteContextProvider;
