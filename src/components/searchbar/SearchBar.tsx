import * as fc from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import { TbWorldSearch } from "react-icons/tb";
import "./search_bar.scss";
import { useEffect, useState } from "react";
import autoCompleteSuggestions from "../../services/suggestion";

const SearchBar = () => {
	const [query, setQuery] = useState<string>("");
	const [autoSuggest, setAutoSuggest] = useState<string[]>([]);

	useEffect(() => {
		const timeout = setTimeout(async () => {
			setAutoSuggest(await autoCompleteSuggestions(query));
		}, 300);

		return () => clearTimeout(timeout);
	}, [query]);

	return (
		<div className="search-wrapper">
			<div className="search-box">
				<a href="https://www.google.co.in/" className="google-icon">
					<fc.FcGoogle />
				</a>
				<input
					type="search"
					placeholder="Search Google or Bookmark"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<div className="divider"></div>
				<div className="search-submit">
					<TbWorldSearch className="web-icon" />
				</div>
			</div>
			{autoSuggest.length !== 0 && (
				<ul className="suggestion">
					{autoSuggest.slice(0, 5).map((suggestion: string, index: number) => (
						<li key={index} className="auto-complete">
							<IoSearch />
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
