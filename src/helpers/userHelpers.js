/* ----------------------------- File Explanation  -----------------------------
this file is holding helpers functions to form custom requests from the server API by getting benefit
from a response that returned by the server to get other useful responses  */
const recipeController = require('../controllers/modelsControllers/recipeController');
const User = require('../models/user');

/** 'formatUserObject' function thats formats the user object to return it back without the password for security
 *
 * @param {Object} user  object of user that holds the info of a user
 * @return {Object} returns new formatted user object
 */
const formatUserObject = async (user) => {
	const userFormatted = {};
	const fetchUser = await (await User.findById(user.id)).populated('recipes');

	userFormatted.id = fetchUser.id;
	if (user.username) {
		userFormatted.username = fetchUser.username;
	}
	if (user.email) {
		userFormatted.email = fetchUser.email;
	}
	if (user.age) {
		userFormatted.age = fetchUser.age;
	}
	if (user.gender) {
		userFormatted.gender = fetchUser.gender;
	}
	if (user.recipes) {
		userFormatted.recipes = fetchUser.recipes;
	}

	return userFormatted;
};

/**
 *
 * @param {String} id of the user to associate it with a recipe
 * @param {Object} recipe data to add it as a recipe ref in the db
 */
const postUserRecipe = async (id, recipe) => {
	try {
		const response = await User.findById(id);
		const createdRecipes = await recipeController.postRecipe(recipe);
		await response.recipes.push(createdRecipes);
		await response.save();

		const fetchNewUserData = await User.findById(id);
		return fetchNewUserData;
	} catch (error) {
		console.log(`error happened in the user helpers at postUserRecipe()  error: ${error.message}`);
	}
};

module.exports = { formatUserObject, postUserRecipe };
