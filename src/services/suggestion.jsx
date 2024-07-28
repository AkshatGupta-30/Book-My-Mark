import suggest from "suggestion";

async function autoCompleteSuggestions(query) {
	const autoComplete = await new Promise((resolve, reject) => {
		suggest(query, (err, suggestions) => {
			if (err) {
				console.error(err);
				reject([]);
			} else {
				resolve(suggestions);
			}
		});
	});
	return autoComplete;
}

export default autoCompleteSuggestions;
