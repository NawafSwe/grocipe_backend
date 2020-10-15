/*--------------- implementing the end point for spoon api ---------------*/
/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name prepareRequest.
 * @param {Object} body contains data such URL or quires.
 * @return {String} returns url formatted for  Classify Grocery Product endpoint.
 * @throws {Error} throws an error if there is error.
 * @description formatting url for end point.
 */
const prepareRequest = async (body) => {
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
