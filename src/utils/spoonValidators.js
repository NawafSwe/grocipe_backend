/* eslint-disable indent */
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
		case 'searchByIngredients': {
			return [
				// eslint-disable-next-line quotes

				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['ingredients', 'number', 'limitLicense', 'ranking', 'ignorePantry'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/* ----------- ingredients validator -----------  */
				body('ingredients', 'request must have ingredients').exists(),
				body('ingredients.length', 'enter a valid array').not().equals('0'),
				body('ingredients').custom((value, { req }) => {
					//checking if a value inside the ingredients has an empty item
					//checking if the values are all string or not
					value.forEach((item) => {
						if (typeof item !== 'string')
							throw new Error('item type is not valid [it should be a string]');
						else if (item === '' || item === ' ') throw new Error('item cannot be empty');
					});
					return true;
				}),

				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),

				/* ----------- number validator -----------  */

				/* 
				The maximum number of recipes to return (between 1 and 100). Defaults to 10.
				*/
				//number must be integer
				body('number', 'number must be integer')
					.optional()
					.isInt()
					.custom((value, { req }) => {
						//checking if the number is value < 1 || > 100
						if (value < 1 || value > 100) throw new Error('number must be between 1-100');
						else return true;
					}),

				/* ----------- limitLicense validator -----------  */
				/* 
			Whether the recipes should have an open license that allows display with proper attribution true or false.
			*/
				//checking if limitLicense is boolean or not
				body('limitLicense', 'limitLicense should be boolean value').optional().isBoolean(),

				/* ----------- ranking validator -----------  */
				/* 
			Whether to maximize used ingredients (1) or minimize missing ingredients (2) first..
			*/
				//checking if ranking is not 1 or 2
				body('ranking')
					.optional()
					.custom((value, { req }) => {
						if (value != 1 && value != 2) throw new Error('ranking must be 1 or 2');
						else return true;
					}),

				/* ----------- ignorePantry validator -----------  */
				/* 
			Whether to ignore typical pantry items, such as water, salt, flour, etc. boolean true false ;; 
			*/
				//checking if ignorePantry is boolean or not
				body('ignorePantry', 'ignorePantry should be boolean value').optional().isBoolean(),
			];
		}
		case 'searchByAutocomplete': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					// first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['query', 'number'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/* ----------- query validator -----------  */
				/*The query to be autocompleted. */
				//query must exist in the request
				body('query', 'request must have query')
					.exists()
					// checking if the query is string or not && non-empty string
					.custom((value, { req }) => {
						//checking if a value inside the ingredients has an empty item
						//checking if the values are all string or not
						if (typeof value !== 'string')
							throw new Error('item type is not valid [it should be a string]');
						else if (value === '' || value === ' ') throw new Error('item cannot be empty');
						else return true;
					}),

				/* ----------- number validator -----------  */
				/* The number of results to return (between 1 and 25).*/
				body('number', 'number must be integer')
					.optional()
					.isInt()
					.custom((value, { req }) => {
						// checking the number is in the range of 1 to 25
						if (value > 25 || value < 1) throw new Error('number must be between 1-25');
						else return true;
					}),

				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'searchIngredientsById': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					// first specifying the schemas of the request to stop any request happing if any;
					// searchById must not include body so it should not contain a body, so it should be undefined
					const schemas = [undefined];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/* ----------- id validator -----------  */
				param('id', 'Enter a valid ID').exists().isInt(),
				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'searchByProductInformation': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					// first specifying the schemas of the request to stop any request happing if any;
					// searchById must not include body so it should not contain a body, so it should be undefined
					const schemas = [undefined];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/* ----------- id validator -----------  */
				param('id', 'Enter a valid ID').exists().isInt(),

				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'parseIngredients': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['ingredientList', 'servings', 'includeNutrition'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*----------- ingredientList Validator -----------*/

				//making sure that the ingredientList array not empty first
				body('ingredientList.length', 'enter a valid array').not().equals('0'),

				//making sure that all the ingredientList elements are string
				body('ingredientList')
					.exists()
					.custom((value, { req }) => {
						value.forEach((ingredient) => {
							if (typeof ingredient != 'string')
								throw new Error('ingredient must be of type string');
							else if (ingredient === '' || ingredient === ' ')
								throw new Error('ingredientList must not have an empty string');
						});
						return true;
					}),

				/*----------- servings Validator -----------*/
				//making sure that serving is integer
				body('servings', 'servings must be of type integer').exists().isInt(),

				/*----------- includeNutrition Validator -----------*/
				//making sure that includeNutrition is boolean
				body('includeNutrition', 'includeNutrition must be boolean').optional().isBoolean(),

				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'visualizeIngredients': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [
						'ingredientList',
						'servings',
						'measure',
						'view',
						'defaultCss',
						'showBacklink',
					];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*----------- ingredientList Validator -----------*/

				//making sure that the ingredientList array not empty first
				body('ingredientList.length', 'enter a valid array').not().equals('0'),

				//making sure that all the ingredientList elements are string
				body('ingredientList')
					.exists()
					.custom((value, { req }) => {
						value.forEach((ingredient) => {
							if (typeof ingredient != 'string')
								throw new Error('ingredient must be of type string');
							else if (ingredient === '' || ingredient === ' ')
								throw new Error('ingredientList must not have an empty string');
						});
						return true;
					}),

				/*----------- servings Validator -----------*/
				//making sure that serving is integer
				body('servings', 'servings must be of type integer').exists().isInt(),

				/*----------- measure Validator -----------*/
				//making sure that measure string
				body('measure', 'measure must be string').optional().isString(),

				/*----------- view Validator -----------*/
				//making sure that view string
				body('view', 'view must be string').optional().isString(),

				/*----------- defaultCss Validator -----------*/
				//making sure that defaultCss boolean
				body('defaultCss', 'defaultCss must be boolean').optional().isBoolean(),

				/*----------- showBacklink Validator -----------*/
				//making sure that defaultCss boolean
				body('showBacklink', 'showBacklink must be boolean').optional().isBoolean(),

				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'classifyCuisine': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['title', 'ingredientList'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*----------- title Validator -----------*/
				body('title', 'title must be string').exists().isString(),

				/*----------- ingredientList Validator -----------*/

				//making sure that the ingredientList array not empty first
				body('ingredientList.length', 'enter a valid array').not().equals('0'),

				//making sure that all the ingredientList elements are string
				body('ingredientList')
					.exists()
					.custom((value, { req }) => {
						value.forEach((ingredient) => {
							if (typeof ingredient != 'string')
								throw new Error('ingredient must be of type string');
							else if (ingredient === '' || ingredient === ' ')
								throw new Error('ingredientList must not have an empty string');
						});
						return true;
					}),
				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'classifyGroceryProduct': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['title', 'upc', 'plu_code', 'locale'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*----------- title Validator -----------*/
				body('title', 'title must be string').exists().isString(),

				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'mapIngredientsGroceryProducts': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['ingredients', 'servings'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*----------- ingredientList Validator -----------*/

				//making sure that the ingredient array not empty first
				body('ingredients.length', 'enter a valid array').not().equals('0'),

				//making sure that all the ingredientList elements are string
				body('ingredients')
					.exists()
					.custom((value, { req }) => {
						value.forEach((ingredient) => {
							if (typeof ingredient != 'string')
								throw new Error('ingredient must be of type string');
							else if (ingredient === '' || ingredient === ' ')
								throw new Error('ingredientList must not have an empty string');
						});
						return true;
					}),

				/*----------- servings Validator -----------*/
				//making sure that serving is integer
				body('servings', 'servings must be of type integer').exists().isInt(),

				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'guessNutritionByDishName': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['title'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*----------- title Validator -----------*/
				body('title', 'title must be string').exists().isString(),

				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'getRecipeInformation': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['includeNutrition'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				body('includeNutrition', 'includeNutrition must be boolean').optional().isBoolean(),

				/*----------- id Validator -----------*/
				param('id', 'id must be integer').exists().isInt(),
				//language options
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
		case 'getRandomRecipe': {
			return [
				/*  ----------- Schema Validation ----------- */
				body('').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['limitLicense', 'tags', 'number'];

					/* calling the validationSchema to check the schema if it returned true means 
					there is no problem with the schema otherwise it will throw an error*/
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*  ----------- limitLicense Validation ----------- */
				body('limitLicense', 'limitLicense must be of type boolean').optional().isBoolean(),

				/*  ----------- tags Validation ----------- */
				//making sure that the tags array not empty first
				body('tags.length', 'enter a valid array').optional().not().equals('0'),

				body('tags')
					.optional()
					.custom((value, { req }) => {
						value.forEach((tag) => {
							if (tag === '' || tag == ' ') throw new Error('tags must not be empty');
							else if (typeof tag != 'string') throw new Error('tags must be of type string');
						});
						return true;
					}),

				/*  ----------- number Validation ----------- */
				body('number')
					.optional()
					.isInt()
					.custom((value, { req }) => {
						if (value < 1 || value > 100) throw new Error('number must be between 1-100');
						else return true;
					}),
				// language Validation
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
			];
		}
	}
};
module.exports = validate;
