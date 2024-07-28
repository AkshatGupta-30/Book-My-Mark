import { TbWorldSearch } from "react-icons/tb";
import "./app.scss";
import { FcGoogle } from "react-icons/fc";

const App = () => (
	<div className="app-page">
		<div className="search-wrapper">
			<div className="search-box">
				<a href="https://www.google.co.in/" className="google-icon">
					<FcGoogle />
				</a>
				<input type="search" placeholder="Search Google or Bookmark" />
				<div className="divider"></div>
				<div className="search-submit">
					<TbWorldSearch className="web-icon" />
				</div>
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
