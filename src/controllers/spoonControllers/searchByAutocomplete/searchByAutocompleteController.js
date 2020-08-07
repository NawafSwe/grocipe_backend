/* ----------------- importing packages ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');

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
