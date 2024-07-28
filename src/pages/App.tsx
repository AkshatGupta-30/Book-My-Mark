import SearchBar from "../components/searchbar/SearchBar";
import TopSites from "../components/topsites/TopSites";
import "./app.scss";

const App = () => (
	<div className="app-page">
		<SearchBar />
		<TopSites/>
	</div>
);

export default App;
