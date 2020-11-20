/* ----------------- importing packages and files ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');
/**
 * 
 * @param {Object} recipe data
 * @return {Response<Promise>} data response from tha api 
 */
const getRecipeInformationRequest = async (recipe) => {
	try {
		const request = prepareRequest(recipe);
		const response = await axios.get(request);
		const result = response.data;
		const standardResult = transformer(result);
		return standardResult;
	} catch (e) {
		console.log('error occurred in spoon getRecipeInformation controller', e);
	}
};
module.exports = getRecipeInformationRequest;
