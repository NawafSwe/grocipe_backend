/* eslint-disable indent */
/*          ------------------- EXPLANATION -------------------
 since all the routes are following the RESTFUL API naming so based on the name of the function in the route
 will goes into the switch case as a case.
*/
const { body, param } = require('express-validator/check');
const validateSchema = require('./checkSchema');

const validate = (method) => {
	switch (method) {
		case 'getAllRecipes': {
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
		case 'postRecipe': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['cuisine', 'healthScore', 'unit', 'ingredients'];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */
				
				/* ----------- cuisine Validation ----------- */
				body('cuisine', 'cuisine must exists and be of type string').exists().isString(),
				body('cuisine', 'cuisine cannot be an empty String').not().equals(''),
				body('cuisine', 'cuisine cannot be an empty String').not().equals(' '),

				/* ----------- healthScore Validation ----------- */
				body('healthScore', 'healthScore must be a Number').optional().isNumeric(),

				/* ----------- unit Validation ----------- */
				body('unit', 'unit must be of type string').optional().isString(),
				body('unit', 'unit cannot be an empty String').optional().not().equals(''),
				body('unit', 'unit cannot be an empty String').optional().not().equals(' '),

				/* ----------- ingredients Validation ----------- */

				body('ingredients', 'ingredient must be exist in a recipe').exists(),
				body('ingredients.length', 'ingredients cannot be an empty array').not().equals('0'),
				body('ingredients')
					.exists()
					.custom((value, { req }) => {
						value.forEach((ingredient) => {
							if (typeof ingredient !== 'object')
								throw new Error(`Ingredient must be of type json object`);
						});
						return true;
					}),
			];
		}
		case 'getRecipeById': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*  ----------- ID  VALIDATION ----------- */
				param('id', 'id must be of type String').exists().isMongoId(),
			];
		}
		case 'deleteRecipe': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*  ----------- ID  VALIDATION ----------- */
				param('id', 'id must be of type String').exists().isMongoId(),
			];
		}

		case 'putRecipe':
			return [
				/*  ----------- ID  VALIDATION ----------- */
				param('id', 'id must be of type String').exists().isMongoId(),
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['cuisine', 'healthScore', 'unit', 'ingredients'];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/* ----------- cuisine Validation ----------- */
				body('cuisine', 'cuisine must exists and be of type string').optional().isString(),
				body('cuisine', 'cuisine cannot be an empty String').not().equals(''),
				body('cuisine', 'cuisine cannot be an empty String').not().equals(' '),

				/* ----------- healthScore Validation ----------- */
				body('healthScore', 'healthScore must be a Number').optional().isNumeric(),

				/* ----------- unit Validation ----------- */
				body('unit', 'unit must be of type string').optional().isString(),
				body('unit', 'unit cannot be an empty String').optional().not().equals(''),
				body('unit', 'unit cannot be an empty String').optional().not().equals(' '),

				/* ----------- ingredients Validation ----------- */
				body('ingredients', 'ingredient must be exist in a recipe').exists(),
				body('ingredients.length', 'ingredients cannot be an empty array').not().equals('0'),
				body('ingredients')
					.exists()
					.custom((value, { req }) => {
						value.forEach((ingredient) => {
							if (typeof ingredient !== 'object')
								throw new Error(`Ingredient must be of type json object`);
						});
						return true;
					}),
			];
	}
};

module.exports = validate;
