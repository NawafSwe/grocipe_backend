const express = require('express');
const authenticationRouter = express.Router();
const passport = require('passport');
const userController = require('../controllers/modelsControllers/userController');

/* ---------------------------- User Authentication routes  ---------------------------- */

/*'/login' to login user to the application*/
authenticationRouter.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			const message = { message: 'password or username is incorrect', status: 400 };
			return res.json(message).status(400);
		}
		req.logIn(user, async function (err) {
			if (err) {
				return next(err);
			}

			const response = {
				message: `successfully logged in as ${user.username}`,
				status: 200,
				statusMessage: 'OK',
				user: userController.formatUserObject(user),
			};
			return res.json(response).status(200);
		});
	})(req, res, next);
});

/* '/logout'  to log out user from the application */
authenticationRouter.get('/logout', async (req, res) => {
	try {
		req.logOut();
		const response = {
			message: 'logged out successfully',
			status: 200,
		};
		res.json(response).status(200);
	} catch (error) {
		console.log('error happened while logging out', error.message);
		const response = {
			message: 'failed to logout',
			status: 400,
		};
		res.json(response).status(400);
	}
});

module.exports = authenticationRouter;
