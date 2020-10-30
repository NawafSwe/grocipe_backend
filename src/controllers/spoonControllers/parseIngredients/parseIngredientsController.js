/* ----------------- importing packages ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');
/**
 *
 * @param {Object} body contains data for the endpoint
 * @returns {Promise<Response>}
 * @throws {Error} it may throws an error during the process.
 */
const parseIngredientsRequest = async (body) => {
	try {
		const request = prepareRequest(body);
		const response = await axios({
			method: 'POST',
			url: request.url,
			data: request.data,
		});
		const result = response.data;

		//const standardResult = transformer(result);
		return result;
	} catch (e) {
		console.log('error occurred in spoon parseIngredients controller ', e);
	}
};

module.exports = parseIngredientsRequest;
