/*---------------------------- importing packages ----------------------------*/
const mongoose = require('mongoose');
/*---------------------------- creating schema ----------------------------*/
const recipeSchema = mongoose.Schema({
	cuisine: { type: String, required: true },
	healthScore: { type: Number },
	unit: { type: String },
	ingredients: [],
	spoonId: { type: Number },
	imageUrl: { type: String },
	missedIngredients: [{ type: String }],
});
/*---------------------------- creating the model in the DB ----------------------------*/
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
