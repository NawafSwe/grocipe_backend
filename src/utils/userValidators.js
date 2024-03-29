/* eslint-disable indent */
/*          ------------------- EXPLANATION -------------------
 since all the routes are following the RESTFUL API naming so based on the name of the function in the route
 will goes into the switch case as a case.
*/
const { body, param } = require('express-validator/check');
const validateSchema = require('./checkSchema');

/** @author Nawaf Alsharqi. 
 * @function
 * @name validate
 * @param {String} method name of the case to determine which validation we go with.
 * @throws {Error} throws an error if there is an error.
 * @description validate request before miss with the database.
 */

const validate = (method) => {
	switch (method) {
		case 'getUsers': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */
			];
		}
		case 'getUserById': {
			return [
				/*--------------------- id validation ---------------------*/
				param('id', 'id must be exist and of type string').exists().isMongoId(),
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */
			];
		}
		case 'postUser': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['username', 'email', 'password', 'age', 'gender', 'recipes'];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*  ----------- username VALIDATION ----------- */
				body('username', 'username must be exist and should be String').exists().isString(),
				body('username', 'username cannot be empty String').not().equals(''),
				body('username', 'username cannot be empty String').not().equals(' '),

				body('username').custom((value, { req }) => {
					if (value.indexOf(' ') > 0) throw new Error('username cannot have spaces');
					else return true;
				}),

				/*  ----------- email VALIDATION ----------- */
				body('email', 'email must exist and should be String').exists().isString(),
				body('email', 'Please enter valid email').exists().isEmail(),
				/*  ----------- password VALIDATION ----------- */
				body('password', 'password must be exists and and should be string').exists().isString(),
				body('password.length', 'password cannot be empty').not().equals('0'),
				body('password').custom((value, { req }) => {
					if (value.length < 8) throw new Error('password must be of length 8 or more');
					else return true;
				}),

				/*  ----------- age VALIDATION ----------- */
				body('age', 'age must be integer').optional().isInt(),

				/*  ----------- gender VALIDATION ----------- */
				body('gender', 'gender must be of type String').optional().isString(),
				body('gender.length', 'cannot post empty gender value of String')
					.optional()
					.not()
					.equals('0'),

				/*  ----------- Recipes VALIDATION ----------- */
				body('recipes')
					.optional()
					.custom((value, { req }) => {
						if (!value.cuisine || value.cuisine == '' || value.cuisine == ' ') {
							throw new Error('recipe must have cuisine');
						} else if (typeof value.cuisine != 'string') {
							throw new Error(`error the cuisine of the recipe must be of type string`);
						} else if (value.image) {
							if (typeof value.image != 'string') {
								throw new Error('image must be of type string');
							}
						} else {
							return true;
						}
					}),
			];
		}
		case 'putUser': {
			return [
				/*--------------------- id validation ---------------------*/
				param('id', 'id must be exist and of type string').exists().isMongoId(),

				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['username', 'email', 'password', 'age', 'gender', 'recipes'];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */
				/*  ----------- username VALIDATION ----------- */
				body('username', 'username must be exist and should be String').optional().isString(),
				body('username', 'username cannot be empty String').optional().not().equals(''),
				body('username', 'username cannot be empty String').optional().not().equals(' '),

				body('username')
					.optional()
					.custom((value, { req }) => {
						if (value.indexOf(' ') > 0) throw new Error('username cannot have spaces');
						else return true;
					}),

				/*  ----------- email VALIDATION ----------- */
				body('email', 'email must exist and should be String').optional().isString(),
				body('email', 'Please enter valid email').optional().isEmail(),

				/*  ----------- password VALIDATION ----------- */
				body('password', 'password must be exists and and should be string').optional().isString(),
				body('password.length', 'password cannot be empty').optional().not().equals('0'),
				body('password')
					.optional()
					.custom((value, { req }) => {
						if (value.length < 8) throw new Error('password must be of length 8 or more');
						else return true;
					}),

				/*  ----------- age VALIDATION ----------- */
				body('age', 'age must be integer').optional().isInt(),

				/*  ----------- gender VALIDATION ----------- */
				body('gender', 'gender must be of type String').optional().isString(),
				body('gender.length', 'cannot post empty gender value of String')
					.optional()
					.not()
					.equals('0'),

				/*  ----------- Recipes VALIDATION ----------- */
				body('recipes')
					.optional()
					.custom((value, { req }) => {
						if (!value.cuisine || value.cuisine == '' || value.cuisine == ' ') {
							throw new Error('recipe must have cuisine');
						} else if (typeof value.cuisine != 'string') {
							throw new Error(`error the cuisine of the recipe must be of type string`);
						} else if (value.image) {
							if (typeof value.image != 'string') {
								throw new Error('image must be of type string');
							}
						} else {
							return true;
						}
					}),
			];
		}
		case 'deleteUser': {
			return [
				/*--------------------- id validation ---------------------*/
				param('id', 'id must be exist and of type string').exists().isMongoId(),

				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */
			];
		}
	}
};

module.exports = validate;
