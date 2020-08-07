/* ----------------- importing packages and files ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');

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
