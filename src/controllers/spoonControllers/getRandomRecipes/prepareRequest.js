/*--------------- implementing the end point for spoon api ---------------*/
/* Get Random Recipes endpoint */

const prepareRequest = (body) => {
	try {
		const spoonHost = 'https://api.spoonacular.com/recipes/random',
			spoonKey = process.env.API_KEY_SPOON || '';
		let paramString = '';
		let isFirstParam = true;
		//all queries are optional so we first need to check if there is no keys to return
		if (Object.keys(body).length === 0) return `${spoonHost}?apiKey=${spoonKey}`;
		else {
			for (let [key, value] of Object.entries(body)) {
				if (key === 'tags') {
					let isFirstTag = true,
						tempTags = '';
					value.forEach((tag) => {
						if (isFirstTag) {
							tempTags += `${tag}`;
							isFirstTag = false;
						} else tempTags += `,${tag}`;
					});
					value = tempTags;
				}
				if (isFirstParam) {
					paramString += `${key}=${value}`;
					isFirstParam = false;
				} else paramString += `&${key}=${value}`;
			}
		}
		return `${spoonHost}?apiKey=${spoonKey}&${paramString}`;
	} catch (e) {
		console.log('error occurred in spoon getRandomRecipe prepareRequest', e);
	}
};
module.exports = prepareRequest;
