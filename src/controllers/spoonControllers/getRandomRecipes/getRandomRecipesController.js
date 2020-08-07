/* ----------------- importing packages and files ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');

const getRandomRecipeRequest = async (body) => {
	try {
		const request = prepareRequest(body);
		const response = await axios.get(request);
		const result = response.data;
		const standardResult = transformer(result);
		return standardResult;
	} catch (e) {
		console.log('error occurred in spoon getRandomRecipe controller', e);
	}
};

module.exports = getRandomRecipeRequest;
