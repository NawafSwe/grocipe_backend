/*--------------- implementing the end point for spoon api ---------------*/

/* Autocomplete Recipe Search endpoint */
/** @author Nawaf Alsharqi
 * @exports
 * @function
 * @name prepareRequest
 * @param {Object} body contains data about the url
 * @returns {string} url string
 * @throws {Error} it may throw an error if there is failure during the process.
 * @description preparing request for the end point autoComplete recipe
 *
 */
const prepareRequest = (body) => {
	try {
		const spoonKey = process.env.API_KEY_SPOON || '',
			spoonHost = 'https://api.spoonacular.com/recipes/autocomplete?';

		let paramString = '',
			isFirstParam = true;

		for (let [key, value] of Object.entries(body)) {
			//checking if it is the first param or no to include &
			if (isFirstParam) {
				paramString += `${key}=${value}`;
				isFirstParam = false;
			} else {
				paramString += `&${key}=${value}`;
			}
		}
		return `${spoonHost}apiKey=${spoonKey}&${paramString}`;
	} catch (e) {
		console.log('error happened in spoon AutocompleteSearch prepareRequest is: ', e);
	}
};

module.exports = prepareRequest;
