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

	public static empty(): Site {
		return new Site({
			title: "",
			url: "",
			favicon: "",
		});
	}
}

export default Site;
