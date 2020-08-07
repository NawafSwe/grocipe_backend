
const transformer = (result) => {
	let standardResult = {};
	try {
		if (result) {
			let recipes = [];
			for (recipe of result.recipes) {
				singleRecipe = {};
				if (recipe.vegetarian) {
					singleRecipe.vegetarian = recipe.vegetarian;
				}
				if (recipe.vegan) {
					singleRecipe.vegan = recipe.vegan;
				}
				if (recipe.creditsText) {
					singleRecipe.creditsText = recipe.creditsText;
				}
				if (recipe.healthScore) {
					singleRecipe.healthScore = recipe.healthScore;
				}
				if (recipe.pricePerServing) {
					singleRecipe.pricePerServing = recipe.pricePerServing;
				}
				if (recipe.title) {
					singleRecipe.title = recipe.title;
				}
				if (recipe.readyInMinutes) {
					singleRecipe.readyInMinutes = recipe.readyInMinutes;
				}
				if (recipe.sourceUrl) {
					singleRecipe.sourceUrl = recipe.sourceUrl;
				}
				if (recipe.image) {
					singleRecipe.image = recipe.image;
				}
				if (recipe.dishTypes) {
					singleRecipe.dishTypes = [];
					for (dish of recipe.dishTypes) {
						singleRecipe.dishTypes.push(dish);
					}
				}
				recipes.push(singleRecipe);
			}
			standardResult.recipes = recipes;
		} else if (result.productMatches) {
			let productMatches = [];
			for (product of result.productMatches) {
				let singleProduct = {};
				if (product.id) {
					singleProduct.id = product.id;
				}
				if (product.title) {
					singleProduct.title = product.title;
				}

				if (product.description) {
					singleProduct.description = product.description;
				}

				if (product.price) {
					singleProduct.price = product.price;
				}

				if (product.imageUrl) {
					singleProduct.imageUrl = product.imageUrl;
				}

				if (product.link) {
					singleProduct.link = product.link;
				}
				productMatches.push(productMatches);
			}
			standardResult.productMatches = productMatches;
		} else {
			return { message: 'no result' };
		}

		if (standardResult) return standardResult;
		else return { message: 'no result' };
	} catch (e) {
		console.log('error occurred in spoon getRandomRecipe transformer', e);
	}
};

module.exports = transformer;
