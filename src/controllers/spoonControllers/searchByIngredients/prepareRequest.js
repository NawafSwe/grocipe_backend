/*--------------- implementing the end point for spoon api ---------------*/
/* Search Recipes by Ingredients endpoint */
const prepareRequest = (body) => {
	try {
		const spoonKey = process.env.API_KEY_SPOON || '';
		const spoonHost = 'https://api.spoonacular.com/recipes/findByIngredients';
		let paramString = '';
		let isFirstParam = true;
		for (let [key, value] of Object.entries(body)) {
			//values are like apple orange ect..
			if (key === 'ingredients') {
				let tmpIngredients = '';
				let isFirstItem = true;
				value.forEach((ingredient) => {
					if (isFirstItem) {
						tmpIngredients += ingredient;
						isFirstItem = false;
					} else {
						tmpIngredients += `,+${ingredient}`;
					}
				});
				value = tmpIngredients;
			}
			if (isFirstParam) {
				paramString += `${key}=${value}`;
				isFirstParam = false;
			} else {
				paramString += `&${key}=${value}`;
			}
		}
		return `${spoonHost}?apiKey=${spoonKey}&${paramString}`;
	} catch (e) {
		console.log('error happened in spoon searchByIngredients prepareRequest is: ', e);
	}
};
module.exports = prepareRequest;
