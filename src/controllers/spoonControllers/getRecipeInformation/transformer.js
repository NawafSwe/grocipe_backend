/** @author Nawaf ALhsarqi.
 * @async
 * @function
 * @name transformer
 * @param {Promise<Response>} result received result from api.
 * @returns {Promise<Object> | Object} cleaned data of type js object.
 * @throws {Error} error message if there is an error.
 * @description transform data and make it more cleaner in a specific order.
 **/
const transformer = async (result) => {
	try {
		let standard = {};
		if (result) {
			if (result.vegetarian != null) {
				standard.vegetarian = result.vegetarian;
			}

			if (result.vegan != null) {
				standard.vegan = result.vegan;
			}

			if (result.glutenFree != null) {
				standard.glutenFree = result.glutenFree;

			}
			if (result.veryHealthy != null) {
				standard.veryHealthy = result.veryHealthy;
			}
			if (result.preparationMinutes != null) {
				standard.preparationMinutes = result.preparationMinutes;
			}
			if (result.cookingMinutes != null) {
				standard.cookingMinutes = result.cookingMinutes;
			}
			if (result.healthScore != null) {
				standard.healthScore = result.healthScore;
			}
			if (result.sourceUrl != null) {
				standard.sourceUrl = result.sourceUrl;
			}
			if (result.nutrition != null) {
				const nutrition = result.nutrition;
				if (nutrition.length > 0) {
					standard.nutrition = result.nutrition;
				}
			}
			return standard;
		} else {
			return { message: 'no results was find to standardize' };
		}
	} catch (e) {
		console.log('error occurred in spoon getRecipeInformation transformer', e);
	}
};

module.exports = transformer;
