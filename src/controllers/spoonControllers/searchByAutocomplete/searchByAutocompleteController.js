/* ----------------- importing packages ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');

/** @author Nawaf Alsharqi
 * @exports
 * @async
 * @function
 * @name searchByAutocompleteRequest
 * @param {Object} body contains all the data needed to search recipes by auto complete.
 * @returns {Promise<Response>}
 * @throws {Error} it may throws an error if there is a failure during the process
 * @description search recipes by auto-complete
 */
const searchByAutocompleteRequest = async (body) => {
	try {
		const request = prepareRequest(body);
		const response = await axios.get(request);
		const result = response.data;
		const standardResult = transformer(result);
		return standardResult;
	} catch (e) {
		console.log('error happened in spoon AutocompleteSearch prepareRequest is: ', e);
	}
};

module.exports = searchByAutocompleteRequest;
