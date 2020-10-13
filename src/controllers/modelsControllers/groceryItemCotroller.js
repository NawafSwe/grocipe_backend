/* ----------------- importing files and models ---------------- */
const GroceryItem = require('../../models/groceryItem');

/* ----------------- FUNCTIONS ---------------- */

/** @author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name getGroceryItems.
 * @return {Object} returns groceries items if there is no error.
 * @return {Error} return an error message if there is an error.
 * @description get all grocery items from the database.
 */
const getGroceryItems = async () => {
	try {
		const response = await GroceryItem.find({});
		return response;
	} catch (e) {
		console.log('error was on groceryItemController at getGroceryItems() ', e.message);
	}
};
/** @author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name
 * @param {String} id of the grocery item.
 * @return {Object} returns a grocery item from the database if there is no error.
 * @return {Error} returns an error message if there is an error.
 * @description returns the grocery from the database by the id.
 */
const getGroceryItemById = async (id) => {
	try {
		const response = await GroceryItem.findById(id);
		return response;
	} catch (e) {
		console.log('error was on groceryItemController at getGroceryItemById() ', e.message);
	}
};

/** @author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name postGroceryItem.
 * @param {Object} grocery  object has the property of a grocery item.
 * @return {Object} returns the created object which is a grocery item if there is no error.
 * @returns {Error} returns an error message if there is an error.
 * @description  posts a new grocery item to the database.
 */
const postGroceryItem = async (grocery) => {
	try {
		const response = await GroceryItem.create(grocery);
		return response;
	} catch (e) {
		console.log('error was on groceryItemController at postGroceryItem() ', e.message);
	}
};

const putGroceryItem = async (id, grocery) => {
	try {
		const response = await GroceryItem.findByIdAndUpdate(id, grocery);
		return response;
	} catch (e) {
		console.log('error was on groceryItemController at putGroceryItem() ', e.message);
	}
};

/** @author Nawaf Alsharqi.
 * @export
 * @async
 * @function
 * @name deleteGroceryItem.
 * @param {String} id of the grocery item.
 * @return {Object} returns  the deleted a grocery item from the database if there is no error.
 * @return {Error} returns an error message if there is an error.
 * @description deletes the grocery from the database by the id.
 */
const deleteGroceryItem = async (id) => {
	try {
		const response = await GroceryItem.findByIdAndRemove(id);
		return response;
	} catch (e) {
		console.log('error was on groceryItemController at deleteGroceryItem() ', e.message);
	}
};

/**
 *
 * @type {{postGroceryItem: (function(Object): Error),
 * putGroceryItem: (function(*=, *=): Promise<*|undefined>),
 * getGroceryItemById: (function(String): Error),
 * getGroceryItems: (function(): Error),
 * deleteGroceryItem: (function(String): Error)}}
 */
module.exports = {
	getGroceryItems,
	postGroceryItem,
	putGroceryItem,
	getGroceryItemById,
	deleteGroceryItem
};
