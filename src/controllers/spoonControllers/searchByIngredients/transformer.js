/** 'transformer' function thats cleans the response and getting rid of unnecessarily information
 *
 * @function
 * @namespace customResult
 * @param {Array} result is an array that holds a response contains json object from spoon api
 * @return {Array} returns cleaned version of an array that holds a response contains json object from spoon api if there is no error
 * @return {Object}  returns a waring message if there is no standard result
 * @throws {Error} returns an error if there is an external error
 */

const customResult = async (result) => {
	try {
		/*------------------ filtering Result before sending ------------------ */
		let standardResult = [];
		//checking if there is a result
		if (result) {
			for (const item of result) {
				//holding the recipe
				let singleRecipe = {};
				/*------------------ CHECKING the keys and getting rid of empty key values ------------------ */

				if (item.id) {
					singleRecipe.id = item.id;
				}

				if (item.title) {
					singleRecipe.title = item.title;
				}

				if (item.image) {
					singleRecipe.image = item.image;
				}

				// if item has likes
				if (item.likes) {
					singleRecipe.likes = item.likes;
				}
				standardResult.push(singleRecipe);
			}

		}
		if (standardResult.length > 0) {
			return standardResult;
		} else {
			return { message: 'no results was find to standardize' };
		}
	} catch (e) {
		console.log('Error occurred in spoon customResult transformer', e);
	}
};

module.exports = customResult;
