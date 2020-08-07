/*--------------- implementing the end point for spoon api ---------------*/
/*Get Product Information endpoint */

const prepareRequest = (recipeId) => {
	try {
		const spoonKey = process.env.API_KEY_SPOON || '';
		const spoonHost = 'https://api.spoonacular.com/food/products/';
		let paramString = recipeId;

		return `${spoonHost}${paramString}?apiKey=${spoonKey}`;
	} catch (e) {
		console.log('error happened in spoon searchByProductInformation prepareRequest is: ', e);
	}
};
module.exports = prepareRequest;
