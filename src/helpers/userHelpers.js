/* ----------------------------- File Explanation  -----------------------------
this file is holding helpers functions to form custom requests from the server API by getting benefit
from a response that returned by the server to get other useful responses  */
const userController = require('../controllers/modelsControllers/userController');

/** 'formatUserObject' function thats formats the user object to return it back without the password for security
 *
 * @param {Object} user  object of user that holds the info of a user
 * @return {Object} returns new formatted user object
 */
const formatUserObject = async (user) => {
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
};

const getUserRecipes = async (id) => {
	let result = {};
	try {
		const response = await userController.getUserById(id);
		if (response.recipes) result.recipes = response.recipes;

		return result;
	} catch (error) {
		console.log(`error happened in the user helpers in getUserRecipes() error: ${error}`);
	}
};

const postUserRecipe = async (id, recipe) => {
	try {
		const response = await userController.getUserById(id);
		await response.recipes.push(recipe);
		await response.save();

		return response;
	} catch (error) {
		console.log(`error happened in the user helpers at postUserRecipe()  error: ${error.message}`);
	}
};

module.exports = { getUserRecipes, formatUserObject };
