/* eslint-disable no-unused-vars */
/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	ingredientRouter = express.Router(),
	ingredientController = require('../controllers/modelsControllers/ingredientController'),
	validate = require('../utils/ingredientValidators'),
	{ validationResult } = require('express-validator/check');

/* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */

/* '/' get request for getting all the ingredients from the database */
ingredientRouter.get('/', validate('getIngredients'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await ingredientController.getIngredients();
		res.json(response).status(200);
	}
});

/* '/:id' get request for getting one ingredient from the database */
ingredientRouter.get('/:id', validate('getIngredientById'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await ingredientController.getIngredientById(req.params.id);
		res.json(response).status(200);
	}
});
/* '/' post request for posting new ingredient in the database */
ingredientRouter.post('/', validate('postIngredient'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await ingredientController.postIngredient(req.body);
		res.json(response).status(200);
	}
});

/* '/:id' delete request for deleting one ingredient from the database */
ingredientRouter.delete('/:id', validate('deleteIngredient'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await ingredientController.deleteIngredient(req.params.id);
		res.json(response).status(400);
	}
});

/* '/:id' put request for updating one ingredient from the database */
ingredientRouter.put('/:id', validate('putIngredient'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await ingredientController.putIngredient(req.params.id, req.body);
		res.json(response).status(200);
	}
});
module.exports = ingredientRouter;
