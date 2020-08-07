/* eslint-disable no-unused-vars */
/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	groceryRouter = express.Router(),
	groceryController = require('../controllers/modelsControllers/groceryItemCotroller'),
	validate = require('../utils/groceryValidators'),
	{ validationResult } = require('express-validator/check');

/* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */

/* '/' get route that gets all the grocery items from the database */

groceryRouter.get('/', validate('getGroceryItems'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await groceryController.getGroceryItems();
		res.json(response).status(200);
	}
});

/* '/' post route that posts new grocery item to the database */
groceryRouter.post('/', validate('postGroceryItem'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await groceryController.postGroceryItem(req.body);
		res.json(response).status(200);
	}
});

/* '/:id' get route that get grocery by id  from the database */
groceryRouter.get('/:id', validate('getGroceryItemById'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await groceryController.getGroceryItemById(req.params.id);
		res.json(response).status(200);
	}
});

/* '/:id' delete route that deletes grocery by id  from the database */
groceryRouter.delete('/:id', validate('deleteGroceryItem'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await groceryController.deleteGroceryItem(req.params.id);
		res.json(response).status(200);
	}
});

/* '/:id put route that update a grocery item from the database by its id */

groceryRouter.put('/:id', validate('putGroceryItem'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await groceryController.putGroceryItem(req.params.id, req.body);
		res.json(response).status(200);
	}
});

module.exports = groceryRouter;
