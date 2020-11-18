/* ----------------- importing packages and files ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name guessNutritionByDishNameRequest
 * @param body contains the data required for the http call
 * @returns {Promise<Response>}
 * @throws {Error} throws an error if there is failure during the process
 * @description guess nutrition by dish name request
 */
const guessNutritionByDishNameRequest = async (body) => {
	try {
		const request = prepareRequest(body);
		const response = await axios.get(request);
		const result = response.data;
		//const standardResult = transformer(result);
		return result;
	} catch (e) {
		console.log('error occurred in spoon guessNutritionByDishName prepareRequest', e);
	}
};

module.exports = guessNutritionByDishNameRequest;
