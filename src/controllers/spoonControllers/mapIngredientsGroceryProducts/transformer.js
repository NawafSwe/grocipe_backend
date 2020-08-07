/** 'transformer' function thats cleans the response and getting rid of unnecessarily information
 *
 * @param {Array} result is an array that holds a response contains json object from spoon api
 * @return {Array} returns cleaned version of an array that holds a response contains json object from spoon api if there is no error
 * @return {Object}  returns a waring message if there is no standard result
 * @return {Error} returns an error if there is an external error
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
