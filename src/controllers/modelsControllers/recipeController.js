/* ----------------- importing files and models ---------------- */
const Recipe = require('../../models/recipe');
const IngredientController = require('./ingredientController');

/* ----------------- FUNCTIONS ---------------- */

/** @author Nawaf AlSharqi
 * @export
 * @async
 * @function
 * @name getAllRecipes
 * @return {list} returns a list of recipes objects if there is no error
 * @return {Error} returns an error message if there is an error
 * @description gets all the recipes from the database
 */
const getAllRecipes = async () => {
	try {
		const response = await Recipe.find({});
		return response;
	} catch (e) {
		console.log(`sorry something went wrong at getAllRecipes() please try again ${e.message}`);
	}
};

/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function
 * @name getRecipeById
 * @param {String} id where it is the id for the recipe
 * @return {Object} returns a recipe  if there is no error
 * @return {Error} returns an error message if there is an error
 * @description gets a specific recipe from the database by id
 */

const getRecipeById = async (id) => {
	try {
		const response = await Recipe.findById(id);
		return response;
	} catch (e) {
		console.log(`sorry something went wrong at getRecipeById() please try again ${e.message}`);
		return { message: `cannot get the recipe with id ${id}` };
	}
};
/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function postRecipe
 * @param {Object} recipe where is the information of a recipe
 * @return {Object} returns the recipe that was added to the database if there is no error
 * @return {Error} returns an error message if there is an error
 * @description  posts a new recipe to the database
 */

const postRecipe = async (recipe) => {
	try {
		const response = await Recipe.create(recipe);
		return response;
	} catch (e) {
		console.log(`something went wrong at postRecipe() please try again ${e.message}`);
	}
};
/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function
 * @name putRecipe
 * @param {String} id where it is the id of the recipe that will be updated from the database
 * @param {Object} recipe
 * @return {Object} returns the updated recipe if there is no error
 * @return {Error} returns an error message if there is an error
 * @description updates a specific recipe from the database by id
 */
const putRecipe = async (id, recipe) => {
	try {
		const response = await Recipe.findByIdAndUpdate(id, recipe);
		return response;
	} catch (e) {
		console.log(`something went wrong at putRecipe() please try again ${e.message}`);
		return { message: `cannot update the recipe with id ${id}` };
	}
};

/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function
 * @name deleteRecipe
 * @param {String} id
 * @return {Object} returns the deleted object from tha database if there is no error
 * @return {Error} returns an error message if there is an error
 * @description delete a specific recipe by id from the database
 */
const deleteRecipe = async (id) => {
	try {
		const response = await Recipe.findByIdAndDelete(id);
		return response;
	} catch (e) {
		console.log(`something went wrong at deleteRecipe() please try again ${e.message}`);
		return { message: `cannot delete the recipe with id ${id}` };
	}
};

/**
 *
 * @type {{getRecipeById: (function(String): Error),
 * getAllRecipes: (function(): Error),
 * putRecipe: (function(String, Object): Error),
 * deleteRecipe: (function(String): Error),
 * postRecipe: (function(Object): Error)}}
 */
module.exports = { getAllRecipes, getRecipeById, postRecipe, putRecipe, deleteRecipe };
