/* ----------------- importing packages ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');
	/** @author Nawaf Alsharqi
	 * @async
	 * @function
	 * @name classifyGroceryProduct. 
	 * @param {Object} body contains the data of type js object to do a post request.
	 * @throws {Error} throws an error if there is an error.
	 * @return {Promise<Response>} returns a response that contains data from the api
	 * @description perform http post request to spoon api for classifying grocery product.
	 */
const classifyGroceryProductRequest = async (body) => {
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
		console.log('error occurred in spoon classifyGroceryProduct controller', e);
	}
};

module.exports = classifyGroceryProductRequest;
