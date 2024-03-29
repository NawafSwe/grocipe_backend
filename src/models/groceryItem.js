/*---------------------------- importing packages ----------------------------*/
const mongoose = require('mongoose');

/*---------------------------- creating schema ----------------------------*/

const groceryItemSchema = mongoose.Schema({
	title: { type: String, required: true },
	price: { type: Number },
	description: { type: String },
	ingredientName: { type: String, required: true },
	images: { type: String },
	category: { type: String }
});

/*---------------------------- creating the model in the DB ----------------------------*/
const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);
module.exports = GroceryItem;
