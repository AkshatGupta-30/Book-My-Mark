import ISite from "../interfaces/ISite";

class Site implements ISite {
	title: string;
	url: string;
	favicon: string;

	constructor(params: { title: string; url: string; favicon: string }) {
		this.title = params.title;
		this.url = params.url;
		this.favicon = params.url;
	}

	public static getAddSite(params: { title: string; url: string }): Site {
		const regex = /^(?:https?:\/\/)?(?:www\.)?([^/]+)/;
		const match = params.url.match(regex);
		return new Site({
			title: params.title,
			url: params.url,
			favicon: match ? match[1] : "",
		});
	}

	public static fromStorage(params: string): Site[] {
		const sites: ISite[] = JSON.parse(params)
		return sites.map((param: ISite) => Site.getAddSite(param));
	}

	public static empty(): Site {
		return new Site({
			title: "",
			url: "",
			favicon: "",
		});
	}
}

export default Site;
