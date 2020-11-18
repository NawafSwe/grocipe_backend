/*---------------------------- importing packages ----------------------------*/
const mongoose = require('mongoose');
/*---------------------------- creating schema ----------------------------*/
const ingredientSchema = mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String },
	originalName: { type: String },
	amount: { type: Number },
	unit: { type: String },
	fullUnitName: { type: String },
	shortUnitName: { type: String },
	metaInformation: [],
});
/*---------------------------- creating the model in the DB ----------------------------*/
const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
