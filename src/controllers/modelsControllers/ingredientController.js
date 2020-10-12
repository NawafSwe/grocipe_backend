/* ----------------- importing files and models ---------------- */
const Ingredient = require('../../models/ingredient');

/* ----------------- FUNCTIONS ---------------- */

/** @author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name getIngredients.
 * @return {list} list of Ingredients objects from the data base if there is no error.
 * @return {Error} returns an error message if there is an error.
 * @description gets all the ingredients from the database.
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

/** @author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name postIngredient.
 * @param {Object} ingredient  where it is an object of type ingredient.
 * @return {Object} it returns the object that was added to the database, if there is no error.
 * @return {Error} it returns an error message if there is an error.
 * @description  post a new ingredient to the database.
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

/** @author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name  getIngredientById.
 * @param {String} id the id of the Ingredient object.
 * @return {Object} returns an object of type Ingredient from the database, if there is no error.
 * @return {Error} returns an error message if there is an error.
 * @description get an ingredient from the database by id.
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

/** @author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name deleteIngredient.
 * @param {String} id the id of the Ingredient object.
 * @return {Object} returns the deleted object from the database which is of type Ingredient if there is no error.
 * @return {Error} returns an error message if there is an error.
 * @description deletes an ingredient from the database by id.
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

/**@author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name putIngredient.
 * @param {String} id the id of an ingredient to update.
 * @param {Object} ingredient object of type ingredient that holds the new values.
 * @return {Object} returns the object that has been updated with the old info if there is no error.
 * @return {Error} returns an error message if there is an error.
 * @description update an ingredient values by id.
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

/**
 *
 * @type {{getIngredientById: (function(String): Error),
 * deleteIngredient: (function(String): Error), putIngredient: (function(String, Object): Error),
 * postIngredient: (function(Object): Error),
 * getIngredients: (function(): Error)}}
 */
module.exports = {
	getIngredients,
	postIngredient,
	getIngredientById,
	deleteIngredient,
	putIngredient
};
