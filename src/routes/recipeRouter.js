/* eslint-disable no-unused-vars */
/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	recipeRouter = express.Router(),
	recipeController = require('../controllers/modelsControllers/recipeController'),
	{ validationResult } = require('express-validator/check'),
	validate = require('../utils/recipeValidators');

/* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */

/* '/' get router that gets all the recipes from the database */

recipeRouter.get('/', validate('getAllRecipes'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await recipeController.getAllRecipes();
		res.json(response).status(200);
	}
});

/* '/' post router that post new recipe to the database */
recipeRouter.post('/', validate('postRecipe'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await recipeController.postRecipe(req.body);
		res.json(response).status(200);
	}
});

/* '/:id' get router that gets a recipe from the database by id */
recipeRouter.get('/:id', validate('getRecipeById'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await recipeController.getRecipeById(req.params.id);
		res.json(response).status(200);
	}
});

/* '/:id' delete router that deletes a recipe from the database by id */
recipeRouter.delete('/:id', validate('deleteRecipe'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await recipeController.deleteRecipe(req.params.id);
		res.json(response).status(200);
	}
});

/* '/' put router that updates a recipe from the database by id */
recipeRouter.put('/:id', validate('putRecipe'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await recipeController.putRecipe(req.params.id, req.body);
		res.json(response).status(200);
	}
});

module.exports = recipeRouter;
