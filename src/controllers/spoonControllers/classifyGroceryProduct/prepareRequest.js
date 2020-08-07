/*--------------- implementing the end point for spoon api ---------------*/
/* Classify Grocery Product endpoint */
const prepareRequest = (body) => {
	try {
		const spoonKey = process.env.API_KEY_SPOON,
			spoonHost = `https://api.spoonacular.com/food/products/classify`;
		const paramString = JSON.stringify(body);
		return { data: paramString, url: `${spoonHost}?apiKey=${spoonKey}` };
	} catch (e) {
		console.log('error occurred in spoon classifyGroceryProduct prepareRequest', e);
	}
};

module.exports = prepareRequest;
