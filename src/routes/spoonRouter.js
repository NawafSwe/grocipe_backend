/* eslint-disable no-unused-vars */
/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	spoonRouter = express.Router(),
	searchByIngredientsRequest = require('../controllers/spoonControllers/searchByIngredients/searchByIngredientsController'),
	parseIngredientsRequest = require('../controllers/spoonControllers/parseIngredients/parseIngredientsController'),
	searchByAutocompleteRequest = require('../controllers/spoonControllers/searchByAutocomplete/searchByAutocompleteController'),
	searchIngredientsByIdRequest = require('../controllers/spoonControllers/searchIngredientsById/searchIngredientsByIdController'),
	visualizeIngredientsRequest = require('../controllers/spoonControllers/visualizeIngredients/visualizeIngredientsController'),
	classifyCuisineRequest = require('../controllers/spoonControllers/classifyCuisine/classifyCuisineController'),
	searchByProductInformationRequest = require('../controllers/spoonControllers/searchByProductInformation/searchByProductInformationController'),
	classifyGroceryProductRequest = require('../controllers/spoonControllers/classifyGroceryProduct/classifyGroceryProductController'),
	mapIngredientsGroceryProductsRequest = require('../controllers/spoonControllers/mapIngredientsGroceryProducts/mapIngredientsGroceryProductsController'),
	guessNutritionByDishNameRequest = require('../controllers/spoonControllers/guessNutritionByDishName/guessNutritionByDishNameController'),
	getRecipeInformationRequest = require('../controllers/spoonControllers/getRecipeInformation/getRecipeInformationController'),
	getRandomRecipeRequest = require('../controllers/spoonControllers/getRandomRecipes/getRandomRecipesController'),
	validate = require('../utils/spoonValidators'),
	{ validationResult } = require('express-validator/check');

/* ----------------- Routes ---------------- */

/* '/searchByIngredients', is POST ROUTE  where it post a request to search for Ingredients  */
spoonRouter.post('/searchByIngredients', validate('searchByIngredients'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const result = await searchByIngredientsRequest(req.body);
		res.json(result).status(200);
	}
});

/* '/searchByIngredients', is POST ROUTE  where it post a request to search for Ingredients  */
spoonRouter.post('/searchByAutocomplete', validate('searchByAutocomplete'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const result = await searchByAutocompleteRequest(req.body);
		res.json(result).status(200);
	}
});

/* '/searchIngredientsById/:id', is POST ROUTE where it finds recipe by ID */
spoonRouter.post(
	'/searchIngredientsById/:id',
	validate('searchIngredientsById'),
	async (req, res) => {
		var err = validationResult(req);
		if (!err.isEmpty()) {
			res.send(err.mapped()).status(400);
		} else {
			const recipeId = req.params.id;
			const result = await searchIngredientsByIdRequest(recipeId);
			res.json(result).status(200);
		}
	}
);

/* '/searchByProductInformation/:id' POST ROUTE where it brings a product information by id */
spoonRouter.post(
	'/searchByProductInformation/:id',
	validate('searchByProductInformation'),
	async (req, res) => {
		var err = validationResult(req);
		if (!err.isEmpty()) res.send(err.mapped()).status(400);
		else {
			const recipeId = req.params.id;
			const result = await searchByProductInformationRequest(recipeId);
			res.json(result).status(200);
		}
	}
);

/* '/parseIngredients' POST ROUTE where it parse Ingredients from text to json object */
spoonRouter.post('/parseIngredients', validate('parseIngredients'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const result = await parseIngredientsRequest(req.body);
		res.json(result).status(200);
	}
});
/* '/visualizeIngredients' POST ROUTE where it get the html contents of given Ingredients */
spoonRouter.post('/visualizeIngredients', validate('visualizeIngredients'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		// we need an html content ----> response were returned with out convert it into json
		const result = await visualizeIngredientsRequest(req.body);
		res.send(result).status(200);
	}
});

/* '/classifyCuisine' POST ROUTE where it Classify the recipe's cuisine. */
spoonRouter.post('/classifyCuisine', validate('classifyCuisine'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const result = await classifyCuisineRequest(req.body);
		res.json(result).status(200);
	}
});

/* '/classifyGroceryProduct' POST ROUTE where 
 This endpoint allows you to match a packaged food to a basic category,
  e.g. a specific brand of milk to the category milk.. */
spoonRouter.post(
	'/classifyGroceryProduct',
	validate('classifyGroceryProduct'),
	async (req, res) => {
		var err = validationResult(req);
		if (!err.isEmpty()) res.send(err.mapped()).status(400);
		else {
			const result = await classifyGroceryProductRequest(req.body);
			res.json(result).status(200);
		}
	}
);

/* '/mapIngredientsGroceryProducts'  Map a set of ingredients to products you can buy in the grocery store.*/
spoonRouter.post(
	'/mapIngredientsGroceryProducts',
	validate('mapIngredientsGroceryProducts'),
	async (req, res) => {
		var err = validationResult(req);
		if (!err.isEmpty()) res.send(err.mapped()).status(400);
		else {
			const result = await mapIngredientsGroceryProductsRequest(req.body);
			res.json(result).status(200);
		}
	}
);

/* '/guessNutritionByDishName' POST ROUTE  where it gets the Estimate the macronutrients of a dish based on its title.*/
spoonRouter.post(
	'/guessNutritionByDishName',
	validate('guessNutritionByDishName'),
	async (req, res) => {
		var err = validationResult(req);
		if (!err.isEmpty()) res.send(err.mapped()).status(400);
		else {
			const result = await guessNutritionByDishNameRequest(req.body);
			res.json(result).status(200);
		}
	}
);

/* '/getRecipeInformation' POST ROUTE Use a recipe id to get full information 
about a recipe, such as ingredients, nutrition, diet and allergen information, etc. */
spoonRouter.post(
	'/getRecipeInformation/:id',
	validate('getRecipeInformation'),
	async (req, res) => {
		var err = validationResult(req);
		if (!err.isEmpty()) res.send(err.mapped()).status(400);
		else {
			// creating json object of recipe to avoid passing two parameters in the getRecipeInformationRequest
			const recipe = { recipeId: req.params.id, includeNutrition: req.body.includeNutrition };
			const result = await getRecipeInformationRequest(recipe);
			res.json(result).status(200);
		}
	}
);

spoonRouter.post('/getRandomRecipe', validate('getRandomRecipe'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const result = await getRandomRecipeRequest(req.body);
		res.json(result).status(200);
	}
});
module.exports = spoonRouter;
