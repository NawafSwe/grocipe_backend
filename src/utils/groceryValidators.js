/* eslint-disable indent */
/*          ------------------- EXPLANATION -------------------
 since all the routes are following the RESTFUL API naming so based on the name of the function in the route
 will goes into the switch case as a case.
*/
const { body, param } = require('express-validator/check');
const validateSchema = require('./checkSchema');

const validate = (method) => {
	switch (method) {
		case 'getGroceryItems': {
			return [
				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//specifying the schema which is undefined
					const schemas = [undefined];
					//if there is no error return true else will throw an error
					if (validateSchema(schemas, req)) return true;
				}),
				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */
			];
		}
		case 'postGroceryItem': {
			return [
				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//specifying the schema which is undefined
					const schemas = ['title', 'price', 'description', 'ingredientName', 'images', 'category'];
					//if there is no error return true else will throw an error
					if (validateSchema(schemas, req)) return true;
				}),
				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */

				/* ---------------------title validation--------------------- */
				body('title', 'title must exists and be of type String').exists().isString(),
				body('title', 'a title cannot be empty String').not().equals(''),
				body('title', 'a title cannot be empty String').not().equals(' '),

				/* --------------------- price validation--------------------- */
				body('price', 'price must exist and be number').exists().isNumeric(),

				/* ---------------------description validation--------------------- */
				body('description', 'description must be of type String').optional().isString(),
				body('description', 'a description cannot be empty String').optional().not().equals(''),
				body('description', 'a description cannot be empty String').optional().not().equals(' '),

				/* ---------------------ingredientName validation--------------------- */

				body('ingredientName', 'ingredientName must exists and be of type String')
					.exists()
					.isString(),
				body('ingredientName', 'a ingredientName cannot be empty String').not().equals(''),
				body('ingredientName', 'a ingredientName cannot be empty String').not().equals(' '),

				/* ---------------------images validation--------------------- */

				/* ---------------------category validation--------------------- */

				body('category', 'category must exists and be of type String').exists().isString(),
				body('category', 'a category cannot be empty String').not().equals(''),
				body('category', 'a category cannot be empty String').not().equals(' '),
			];
		}
		case 'getGroceryItemById': {
			return [
				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//specifying the schema which is undefined
					const schemas = [undefined];
					//if there is no error return true else will throw an error
					if (validateSchema(schemas, req)) return true;
				}),
				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */

				param('id', 'id must be exists and be of type string ').exists().isMongoId(),
			];
		}

		case 'deleteGroceryItem': {
			return [
				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//specifying the schema which is undefined
					const schemas = [undefined];
					//if there is no error return true else will throw an error
					if (validateSchema(schemas, req)) return true;
				}),
				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */

				/* --------------------- ID VALIDATION ---------------------  */

				param('id', 'id must be exists and be of type string ').exists().isMongoId(),
			];
		}

		case 'putGroceryItem': {
			return [
				/* --------------------- ID VALIDATION ---------------------  */

				param('id', 'id must be exists and be of type string ').exists().isMongoId(),

				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//specifying the schema which is undefined
					const schemas = ['title', 'price', 'description', 'ingredientName', 'images', 'category'];
					//if there is no error return true else will throw an error
					if (validateSchema(schemas, req)) return true;
				}),
				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */

				/* ---------------------title validation--------------------- */
				body('title', 'title must be of type String').optional().isString(),
				body('title', 'a title cannot be empty String').not().equals(''),
				body('title', 'a title cannot be empty String').not().equals(' '),

				/* --------------------- price validation--------------------- */
				body('price', 'price must be number').optional().isNumeric(),

				/* ---------------------description validation--------------------- */
				body('description', 'description must be of type String').optional().isString(),
				body('description', 'a description cannot be empty String').not().equals(''),
				body('description', 'a description cannot be empty String').not().equals(' '),

				/* ---------------------ingredientName validation--------------------- */

				body('ingredientName', 'ingredientName must be of type String').optional().isString(),
				body('ingredientName', 'a ingredientName cannot be empty String').not().equals(''),
				body('ingredientName', 'a ingredientName cannot be empty String').not().equals(' '),

				/* ---------------------images validation--------------------- */

				/* ---------------------category validation--------------------- */

				body('category', 'category must be of type String').optional().isString(),
				body('category', 'a category cannot be empty String').not().equals(''),
				body('category', 'a category cannot be empty String').not().equals(' '),
			];
		}
	}
};

module.exports = validate;
