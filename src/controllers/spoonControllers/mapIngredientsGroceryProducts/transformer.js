/** @author Nawaf ALhsarqi.
 * @async
 * @function
 * @name transformer
 * @param {Promise<Response>} result received result from api.
 * @returns {Promise<Object>} cleaned data of type js object.
 * @throws {Error} throws an error if there is an external error.
 * @description cleans the response and getting rid of unnecessarily information.
 */
const transformer = (result) => {
	/*------------------ filtering Result before sending ------------------ */
	try {
		let standardResult = [];

		if (result) {
			for (item of result) {
				let singleIngredient = {};
				//checking which name included in the response
				if (item.original) {
					singleIngredient.original = item.original;
				} else if (item.originalString) {
					singleIngredient.originalString = item.originalString;
				} else if (item.originalName) {
					singleIngredient.originalName = item.originalName;
				}

				//checking for the meta if they are included in the response
				if (item.meta) {
					singleIngredient.meta = [];
					for (singleMeta of item.meta) {
						singleIngredient.meta.push(singleMeta);
					}
				} else if (item.metaInformation) {
					singleIngredient.metaInformation = [];
					for (singleMeta of item.metaInformation) {
						singleIngredient.metaInformation.push(singleMeta);
					}
				}
				//checking if there are products
				if (item.products) {
					singleIngredient.products = [];
					for (product of item.products) singleIngredient.products.push(product);
				}

				standardResult.push(singleIngredient);
			}
		}

		if (standardResult.length > 0) {
			return standardResult;
		} else {
			return { message: 'no results was find to standardize' };
		}
	} catch (e) {
		console.log('error occurred in spoon mapIngredientsGroceryProducts transformer', e);
	}
};
module.exports = transformer;
