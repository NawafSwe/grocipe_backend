/*--------------- implementing the end point for spoon api ---------------*/
/* get Recipe Information endpoint */
const prepareRequest = (recipe) => {
	try {
		const spoonHost = 'https://api.spoonacular.com/recipes/',
			spoonKey = process.env.API_KEY_SPOON || '';
		let paramString = '';
		// since this endpoint only has only includeNutrition we check if its exist or not
		if (recipe.includeNutrition === undefined) {
			//if not exist
			paramString = `${spoonHost}${recipe.recipeId}/information?&apiKey=${spoonKey}`;
			return paramString;
		} else {
			//if exist
			paramString = `${spoonHost}${recipe.recipeId}/information?includeNutrition=${recipe.includeNutrition}&apiKey=${spoonKey}`;
			return paramString;
		}
	} catch (e) {
		console.log('error occurred in spoon getRecipeInformation prepareRequest', e);
	}
};

module.exports = prepareRequest;
