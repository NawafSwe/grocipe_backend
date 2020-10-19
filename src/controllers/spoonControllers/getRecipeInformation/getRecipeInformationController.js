/* ----------------- importing packages and files ---------------- */
const axios = require('axios'),
	prepareRequest = require('./prepareRequest'),
	transformer = require('./transformer');
/**
 * 
 * @param {*} recipe 
 */
const getRecipeInformationRequest = async (recipe) => {
	try {
		const request = prepareRequest(recipe);
		const response = await axios.get(request);
		const result = response.data;
		const standardResult = transformer(result);
		return result;
	} catch (e) {
		console.log('error occurred in spoon getRecipeInformation controller', e);
	}
};
module.exports = getRecipeInformationRequest;
