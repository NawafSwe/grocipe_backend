/** 'transformer' function thats cleans the response and getting rid of unnecessarily information
 *
 * @param {Array} result is an array that holds a response contains json object from spoon api
 * @return {Array} returns cleaned version of an array that holds a response contains json object from spoon api if there is no error
 * @return {Object}  returns a waring message if there is no standard result
 * @throws {Error} returns an error if there is an external error
 */
const transformer = (result) => {
	try {
		/*------------------ filtering Result before sending ------------------ */
		let standardResult = [];


		//checking if there is a result
		if (result) {
			for (item of result) {
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

				// if (item.imageType) {
				// 	singleRecipe.imageType = item.imageType;
				// }

				if (item.usedIngredientCount) {
					singleRecipe.usedIngredientCount = item.usedIngredientCount;
				}
				if (item.missedIngredientCount) {
					singleRecipe.missedIngredientCount = item.missedIngredientCount;
				}
				// if item has likes
				if (item.likes) {
					singleRecipe.likes = item.likes;
				}

				if (item.missedIngredients) {
					singleRecipe.missedIngredients = [];
					for (ingredient of item.missedIngredients) {
						let tempIngredient = {};
						if (ingredient.id) {
							tempIngredient.id = ingredient.id;
						}

						if (ingredient.amount) {
							tempIngredient.amount = ingredient.amount;
						}

						if (ingredient.unit) {
							tempIngredient.unit = ingredient.unit;
						} else if (ingredient.unitShort) {
							tempIngredient.unitShort = ingredient.unitShort;
						}

						if (ingredient.unitLong) {
							tempIngredient.unitLong = ingredient.unitLong;
						}

						if (ingredient.aisle) {
							tempIngredient.aisle = ingredient.aisle;
						}

						if (ingredient.name) {
							tempIngredient.name = ingredient.name;
						} else if (ingredient.originalName) {
							tempIngredient.originalName = ingredient.originalName;
						}

						if (ingredient.original) {
							tempIngredient.original = ingredient.original;
						} else if (ingredient.originalString) {
							tempIngredient.originalString = ingredient.originalString;
						}

						if (ingredient.metaInformation) {
							tempIngredient.metaInformation = [];
							for (meta of ingredient.metaInformation) {
								tempIngredient.metaInformation.push(meta);
							}
						} else if (ingredient.meta) {
							tempIngredient.meta = [];
							for (meta of ingredient.meta) {
								tempIngredient.metaInformation.push(meta);
							}
						}
						if (ingredient.image) {
							tempIngredient.image = ingredient.image;
						}

						singleRecipe.missedIngredients.push(tempIngredient);
					}
				}
				if (item.usedIngredients) {
					singleRecipe.usedIngredients = [];
					for (ingredient of item.usedIngredients) {
						let tempIngredient = {};
						if (ingredient.id) {
							tempIngredient.id = ingredient.id;
						}
						if (ingredient.amount) {
							tempIngredient.amount = ingredient.amount;
						}

						if (ingredient.unit) {
							tempIngredient.unit = ingredient.unit;
						} else if (ingredient.unitShort) {
							tempIngredient.unitShort = ingredient.unitShort;
						}

						if (ingredient.unitLong) {
							tempIngredient.unitLong = ingredient.unitLong;
						}

						if (ingredient.aisle) {
							tempIngredient.aisle = ingredient.aisle;
						}

						if (ingredient.name) {
							tempIngredient.name = ingredient.name;
						} else if (ingredient.originalName) {
							tempIngredient.originalName = ingredient.originalName;
						}

						if (ingredient.original) {
							tempIngredient.original = ingredient.original;
						} else if (ingredient.originalString) {
							tempIngredient.originalString = ingredient.originalString;
						}

						if (ingredient.metaInformation) {
							tempIngredient.metaInformation = [];
							for (meta of ingredient.metaInformation) {
								tempIngredient.metaInformation.push(meta);
							}
						} else if (ingredient.meta) {
							tempIngredient.meta = [];
							for (meta of ingredient.meta) {
								tempIngredient.metaInformation.push(meta);
							}
						}
						if (ingredient.image) {
							tempIngredient.image = ingredient.image;
						}
						singleRecipe.usedIngredients.push(tempIngredient);

					}
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
		console.log('Error occurred in spoon searchByIngredients transformer', e);
	}
};

module.exports = transformer;
