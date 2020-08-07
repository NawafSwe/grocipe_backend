/*--------------- implementing the end point for spoon api ---------------*/
/* Map Ingredients to Grocery Products endpoint */
const prepareRequest = (body) => {
	try {
		const spoonHost = 'https://api.spoonacular.com/food/ingredients/map',
			spoonKey = process.env.API_KEY_SPOON || '';
		const paramString = JSON.stringify(body);
		return { data: paramString, url: `${spoonHost}?apiKey=${spoonKey}` };
	} catch (e) {
		console.log('error occurred in spoon mapIngredientsGroceryProducts prepareRequest', e);
	}
};
module.exports = prepareRequest;
