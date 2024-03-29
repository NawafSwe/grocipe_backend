/* ----------------- importing packages ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');

const visualizeIngredientsRequest = async (body) => {
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
		console.log('error occurred in spoon visualizeIngredients controller ', e);
	}
};

module.exports = visualizeIngredientsRequest;
