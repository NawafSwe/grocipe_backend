/* ----------------- importing packages and files ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');
const mapIngredientsGroceryProductsRequest = async (body) => {
	try {
		const request = prepareRequest(body);
		const response = await axios({
			method: 'POST',
			url: request.url,
			data: request.data,
		});
		const result = response.data;
	    const standardResult = transformer(result);
		return standardResult;
	} catch (e) {
		console.log('error occurred in spoon mapIngredientsGroceryProducts controller', e);
	}
};

module.exports = mapIngredientsGroceryProductsRequest;
