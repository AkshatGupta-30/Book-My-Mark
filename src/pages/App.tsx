import { TbWorldSearch } from "react-icons/tb";
import "./app.scss";

const App = () => (
	<div className="app-page">
		<div className="search-wrapper">
			<div className="search-box">
				<TbWorldSearch />
				<input type="search" />
			</div>
			<div className="auto-complete">
				<ul className="internet-suggestions">
					<li className="web-search"></li>
					<li className="web-search"></li>
					<li className="web-search"></li>
					<li className="web-search"></li>
					<li className="web-search"></li>
				</ul>
				<ul className="bookmark-suggestions">
					<li className="bookmark"></li>
					<li className="bookmark"></li>
					<li className="bookmark"></li>
					<li className="bookmark"></li>
					<li className="bookmark"></li>
				</ul>
			</div>
		</div>
	</div>
);

export default App;
