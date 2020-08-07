/* ----------------- importing files and models ---------------- */
const GroceryItem = require('../../models/groceryItem');

/* ----------------- FUNCTIONS ---------------- */

/**
 * 'getGroceryItems' functions is to get all grocery items from the database ;;
 * @return {Object} returns groceries items if there is no error
 * @return {Error} return an error message if there is an error;
 */
const getGroceryItems = async () => {
	try {
		const response = await GroceryItem.find({});
		return response;
	} catch (e) {
		console.log('error was on groceryItemController at getGroceryItems() ', e.message);
	}
};
/**
 * 'getGroceryItemById' function that returns the grocery from the database by the id
 * @param {String} id of the grocery item
 * @return {Object} returns a grocery item from the database if there is no error
 * @return {Error} returns an error message if there is an error
 */
const getGroceryItemById = async (id) => {
	try {
		const response = await GroceryItem.findById(id);
		return response;
	} catch (e) {
		console.log('error was on groceryItemController at getGroceryItemById() ', e.message);
	}
};

/**
 * 'postGroceryItem' function that posts a new grocery item to the database;
 * @param {Object} grocery  object has the property of a grocery item
 * @return {Object} returns the created object which is a grocery item if there is no error;
 * @returns {Error} returns an error message if there is an error
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

/**
 * 'deleteGroceryItem' function that deletes the grocery from the database by the id
 * @param {String} id of the grocery item
 * @return {Object} returns  the deleted a grocery item from the database if there is no error
 * @return {Error} returns an error message if there is an error
 */
const deleteGroceryItem = async (id) => {
	try {
		const response = await GroceryItem.findByIdAndRemove(id);
		return response;
	} catch (e) {
		console.log('error was on groceryItemController at deleteGroceryItem() ', e.message);
	}
};

module.exports = {
	getGroceryItems,
	postGroceryItem,
	putGroceryItem,
	getGroceryItemById,
	deleteGroceryItem,
};
