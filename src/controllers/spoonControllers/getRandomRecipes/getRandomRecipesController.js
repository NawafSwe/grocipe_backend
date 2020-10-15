/* ----------------- importing packages and files ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');

	/** @author Nawaf Alsharqi.
	 * @async
	 * @function
	 * @name getRandomRecipeRequest.
	 * @param {body} body contains data for the request.
	 * @throws {Error} throws an error if there is an error.
	 * @returns {Promise<Response>} returns http response from the api.
	 * @description getting random recipe from the api.
	 */
const getRandomRecipeRequest = async (body) => {
	try {
		const request =  prepareRequest(body);
		const response = await axios.get(request);
		const result = response.data;
		const standardResult = transformer(result);
		return standardResult;
	} catch (e) {
		console.log('error occurred in spoon getRandomRecipe controller', e);
	}
};

module.exports = getRandomRecipeRequest;
