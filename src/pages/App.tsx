import { TbWorldSearch } from "react-icons/tb";
import "./app.scss";

const App = () => (
	<div className="main-page">
		<div className="search-wrapper">
			<div className="search-box">
				<TbWorldSearch />
				<input type="search" />
			</div>
			<ul className="suggestions">
				<li className="auto-search"></li>
				<li className="auto-search"></li>
				<li className="auto-search"></li>
				<li className="auto-search"></li>
				<li className="auto-search"></li>
			</ul>
		</div>
	</div>
);

export default App;
