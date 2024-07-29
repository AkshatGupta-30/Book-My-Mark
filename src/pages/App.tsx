import React from "react";
import SearchBar from "../components/searchbar/SearchBar";
import TopSites from "../components/topsites/TopSites";
import TopSiteContextProvider from "../context/TopSiteContext";
import "./app.scss";

const App = () => (
	<div className="app-page">
		<SearchBar />
		<TopSiteContextProvider>
			<TopSites />
		</TopSiteContextProvider>
	</div>
);

export default App;
