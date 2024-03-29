/* eslint-disable no-unused-vars */
/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	userRouter = express.Router(),
	userController = require('../controllers/modelsControllers/userController'),
	validate = require('../utils/userValidators'),
	{ validationResult } = require('express-validator/check');
/* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */
/* '/' this route is GET ROUTE where it gets all the users from the database */
userRouter.get('/', validate('getUsers'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.getUsers();
		res.json(response).status(200);
	}
});
/* '/' this route is GET ROUTE where it gets a user from the database by the id */
userRouter.get('/:id', validate('getUserById'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.getUserById(req.params.id);
		res.json(response).status(200);
	}
});

/* '/' this route is post ROUTE where it posts a user to the database*/

userRouter.post('/', validate('postUser'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.postUser(req.body);
		res.json(response).status(200);
	}
});

/*'/:id' this route is PUT ROUTE where it updates a user in the database */
userRouter.put('/:id', validate('putUser'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.putUser(req.params.id, req.body);
		res.json(response).status(200);
	}
});

/*'/:id' this route is DELETE ROUTE where it deletes a user from the database */
userRouter.delete('/:id', validate('deleteUser'), async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.deleteUser(req.params.id);
		res.json(response).status(200);
	}
});

//User Recipes
userRouter.get('/:id/recipes/', async (req, res) => {});
userRouter.get('/:id/recipes/:recId', async (req, res) => {});
userRouter.post('/:id/recipes/', async (req, res) => {});
userRouter.put('/:id/recipes/:recId', async (req, res) => {});

userRouter.delete('/:id/recipes/:recId', async (req, res) => {
	const userId = req.params.id;
	const recId = req.params.recId;

	const response = await userController.deleteUserRecipe(userId, recId);
	res.send(response).status(200);
});
module.exports = userRouter;
