import Site from "../models/Site";

const topSites: Site[] = [
	Site.getAddSite({ title: "Github", url: "github.com" }),
	Site.getAddSite({ title: "Stack Overflow", url: "stackoverflow.com" }),
	Site.getAddSite({ title: "Youtube", url: "youtube.com" }),
	Site.getAddSite({ title: "Instagram", url: "instagram.com" }),
];

export default topSites;
