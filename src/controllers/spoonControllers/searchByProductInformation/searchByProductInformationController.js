/* ----------------- importing packages ---------------- */

const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');

const searchByProductInformation = async (recipeId) => {
	try {
		const request = prepareRequest(recipeId);
		const response = await axios.get(request);
		const result = response.data;
		//const standardResult = transformer(result);
		return result;
	} catch (e) {
		console.log('Error occurred in spoon searchByProductInformation controller', e);
	}
};

module.exports = searchByProductInformation;
