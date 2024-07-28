import * as fc from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import { TbWorldSearch } from "react-icons/tb";
import "./search_bar.scss";
import { useEffect, useState } from "react";
import autoCompleteSuggestions from "../../services/suggestion";

const SearchBar = () => {
	const [query, setQuery] = useState<string>("");
	const [autoSuggest, setAutoSuggest] = useState<string[]>([]);
	const [highlightedSuggestion, setHighlightedSuggestion] = useState<number>(-1);

	useEffect(() => {
		let timeout: number;
		if (query.length) {
			timeout = setTimeout(async () => {
				setAutoSuggest(await autoCompleteSuggestions(query));
			}, 300);
		}

		return () => clearTimeout(timeout);
	}, [query]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowDown") {
			setHighlightedSuggestion((prevIndex) => {
				const nextIndex = prevIndex + 1;
				return nextIndex < autoSuggest.length ? nextIndex : 0;
			});
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlightedSuggestion((prevIndex) => {
				const nextIndex = prevIndex - 1;
				return nextIndex > -1 ? nextIndex : autoSuggest.length - 1;
			});
		} else if (e.key === "Enter") {
			window.location.href = `https://www.google.co.in/search?q=${
				highlightedSuggestion >= 0 ? autoSuggest[highlightedSuggestion] : query
			}`;
		}
	};

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
					onKeyDown={handleKeyDown}
					onChange={(e) => {
						setQuery(e.target.value);
						setHighlightedSuggestion(-1);
					}}
				/>
				<div className="divider"></div>
				<div
					className="search-submit"
					style={{ pointerEvents: query.length ? "all" : "none" }}
					onClick={() =>
						(window.location.href = `https://www.google.co.in/search?q=${query}`)
					}
				>
					<TbWorldSearch className="web-icon" />
				</div>
			</div>
			{query && autoSuggest.length !== 0 && (
				<ul className="suggestion">
					{autoSuggest.slice(0, 5).map((suggestion: string, index: number) => (
						<li
							key={index}
							className={`auto-complete ${
								highlightedSuggestion === index ? "highlighted" : ""
							}`} // Add class for highlighted suggestion
							onClick={() =>
								(window.location.href = `https://www.google.co.in/search?q=${suggestion}`)
							}
						>
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
