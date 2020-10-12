/* ----------------- importing files and models ---------------- */
const Ingredient = require('../../models/ingredient');

/* ----------------- FUNCTIONS ---------------- */

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name getIngredients
 * @return {list} list of Ingredients objects from the data base if there is no error
 * @return {Error} returns an error message if there is an error
 * @description gets all the ingredients from the database
 */

const getIngredients = async () => {
	try {
		const response = await Ingredient.find({});
		return response;
	} catch (e) {
		console.log('error occurred in ingredientController getIngredients() ', e.message);
		return { message: `something went wrong please try again ${e.message}` };
	}
};

/**
 * 'postIngredient' function it post a new ingredient to the database.
 * @param {Object} ingredient  where it is an object of type ingredient.
 * @return {Object} it returns the object that was added to the database, if there is no error
 * @return {Error} it returns an error message if there is an error
 */
const postIngredient = async (ingredient) => {
	try {
		const response = await Ingredient.create(ingredient);
		return response;
	} catch (e) {
		console.log('error occurred in ingredientController postIngredient() ', e.message);
		return { message: `something went wrong please try again ${e.message}` };
	}
};

/**
 * 'getIngredientById' function where its get an ingredient from the database by id
 * @param {String} id the id of the Ingredient object
 * @return {Object} returns an object of type Ingredient from the database, if there is no error
 * @return {Error} returns an error message if there is an error
 */

const getIngredientById = async (id) => {
	try {
		const response = await Ingredient.findById(id);
		return response;
	} catch (e) {
		console.log('error occurred in ingredientController getIngredientById() ', e.message);
		return { message: `something went wrong please try again ${e.message}` };
	}
};

/**
 * 'deleteIngredient' function that deletes an ingredient from the database by id.
 * @param {String} id the id of the Ingredient object
 * @return {Object} returns the deleted object from the database which is of type Ingredient if there is no error
 * @return {Error} returns an error message if there is an error
 */
const deleteIngredient = async (id) => {
	try {
		const response = await Ingredient.findByIdAndRemove(id);
		return response;
	} catch (e) {
		console.log('error occurred in ingredientController deleteIngredient() ', e.message);
		return { message: `something went wrong please try again ${e.message}` };
	}
};

/**
 * 'putIngredient' function to update an ingredient values by id
 * @param {String} id the id of an ingredient to update
 * @param {Object} ingredient object of type ingredient that holds the new values
 * @return {Object} returns the object that has been updated with the old info if there is no error
 * @return {Error} returns an error message if there is an error
 */
const putIngredient = async (id, ingredient) => {
	try {
		const response = await Ingredient.findByIdAndUpdate(id, ingredient);
		return response;
	} catch (e) {
		console.log('error occurred in ingredientController putIngredient() ', e.message);
		return { message: `something went wrong please try again ${e.message}` };
	}
};

module.exports = {
	getIngredients,
	postIngredient,
	getIngredientById,
	deleteIngredient,
	putIngredient
};
