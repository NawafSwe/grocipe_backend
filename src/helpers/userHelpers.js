/* ----------------------------- File Explanation  -----------------------------
this file is holding helpers functions to form custom requests from the server API by getting benefit
from a response that returned by the server to get other useful responses  */
const recipeController = require('../controllers/modelsControllers/recipeController');
const User = require('../models/user');

/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name formatUserObject.
 * @param {Object} user  object of user that holds the info of a user.
 * @return {Object} returns new formatted user object.
 * @description formats the user object to return it back without the password for security.
 */
const formatUserObject = async (user) => {
	try {
		const userFormatted = {};

		userFormatted.id = user.id;
		if (user.username) {
			userFormatted.username = user.username;
		}
		if (user.email) {
			userFormatted.email = user.email;
		}
		if (user.age) {
			userFormatted.age = user.age;
		}
		if (user.gender) {
			userFormatted.gender = user.gender;
		}
		if (user.recipes) {
			userFormatted.recipes = user.recipes;
		}
		return userFormatted;
	} catch (e) {
		console.log(`error happened while formatting user object ${e}`);
	}
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
