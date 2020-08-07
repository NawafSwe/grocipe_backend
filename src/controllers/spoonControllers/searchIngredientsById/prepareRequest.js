/*--------------- implementing the end point for spoon api ---------------*/
/*Get Recipe Ingredients by ID endpoint */
const prepareRequest = (recipeId) => {
	try {
		/*spoon host for this end point https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
         it will need additional var to be connected to form valid request as shown below
         */
		const spoonKey = process.env.API_KEY_SPOON || '';
		let paramString = recipeId;
		const spoonHost = `https://api.spoonacular.com/recipes/${paramString}/ingredientWidget.json`;

		return `${spoonHost}?apiKey=${spoonKey}`;
	} catch (e) {
		console.log('error happened in spoon searchIngredientsById prepareRequest is: ', e);
	}
};

module.exports = prepareRequest;
