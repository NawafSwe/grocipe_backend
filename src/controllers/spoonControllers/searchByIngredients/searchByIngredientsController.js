/* ----------------- importing packages ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer'),
	spoonHelper = require('../../helpers/spoonHelpers');
searchByIngredientsRequest = async (body) => {
	try {
		const request = prepareRequest(body);
		const response = await axios.get(request);
		const result = response.data;
		const standardResult = transformer(result);

		return standardResult;
	} catch (e) {
		console.log('Error occurred in spoon searchByIngredients controller', e);
	}
};

module.exports = searchByIngredientsRequest;
