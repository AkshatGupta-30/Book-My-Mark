import { FcGoogle } from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import { TbWorldSearch } from "react-icons/tb";
import "./search_bar.scss";

const SearchBar = () => {
	return (
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
			<ul className="suggestion">
				<li className="auto-complete">
					<IoSearch />
					Web Search
				</li>
				<li className="auto-complete">
					<IoSearch />
					Web Search
				</li>
				<li className="auto-complete">
					<IoSearch />
					Web Search
				</li>
				<li className="auto-complete">
					<IoSearch />
					Web Search
				</li>
				<li className="auto-complete">
					<IoSearch />
					Web Search
				</li>
			</ul>
		</div>
	);
};

export default SearchBar;
