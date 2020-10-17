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
		case 'getIngredients': {
			return [
				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),

				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */
			];
		}
		case 'getIngredientById': {
			return [
				/*--------------------- id validation ---------------------*/
				param('id', 'id must be exist and of type string').exists().isMongoId(),

				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),

				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */
			];
		}
		case 'postIngredient': {
			return [
				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [
						'name',
						'image',
						'originalName',
						'amount',
						'unit',
						'fullUnitName',
						'shortUnitName',
						'metaInformation',
					];
					if (validateSchema(schemas, req)) return true;
				}),

				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */

				/* --------------------- name VALIDATION ---------------------  */
				body('name', 'name must be exists and be of type String').exists().isString(),
				body('name', 'name of ingredient cannot be empty string').not().equals(''),
				body('name', 'name of ingredient cannot be empty string').not().equals(' '),

				/* --------------------- image VALIDATION --------------------- */

				/* --------------------- originalName VALIDATION --------------------- */

				body('originalName', 'originalName must be of type String').optional().isString(),

				body('name', 'originalName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(''),

				body('name', 'originalName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(' '),

				/* --------------------- amount VALIDATION --------------------- */
				body('amount', 'amount must be of type float or integer like 3.5 or 3')
					.optional()
					.isFloat(),

				/* --------------------- unit VALIDATION --------------------- */
				body('unit', 'unit must be of type String').optional().isString(),

				body('unit', 'unit of ingredient cannot be empty string').optional().not().equals(''),

				body('unit', 'unit of ingredient cannot be empty string').optional().not().equals(' '),

				/* --------------------- fullUnitName VALIDATION --------------------- */
				body('fullUnitName', 'fullUnitName must be of type String').optional().isString(),

				body('fullUnitName', 'fullUnitName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(''),

				body('fullUnitName', 'fullUnitName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(' '),

				/* --------------------- shortUnitName VALIDATION --------------------- */
				body('shortUnitName', 'shortUnitName must be of type String').optional().isString(),

				body('shortUnitName', 'shortUnitName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(''),

				body('shortUnitName', 'shortUnitName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(' '),

				/* --------------------- metaInformation VALIDATION --------------------- */
				body('metaInformation.length', 'metaInformation of ingredient cannot be empty list')
					.optional()
					.not()
					.equals('0'),

				body('metaInformation')
					.optional()
					.custom((value, { req }) => {
						//checking that all the metaInfo are string
						value.forEach((meta) => {
							if (typeof meta != 'string') throw new Error('metaInfo must be of type string');
							else if (meta === '' || meta === ' ')
								throw new Error('metaInfo cannot be empty String');
						});
						return true;
					}),
			];
		}
		case 'deleteIngredient': {
			return [
				/*--------------------- id validation ---------------------*/
				param('id', 'id must be exist and of type string').exists().isMongoId(),

				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),

				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */
			];
		}
		case 'putIngredient': {
			return [
				/*--------------------- id validation ---------------------*/
				param('id', 'id must be exist and of type string').exists().isString(),

				/* --------------------- SCHEMA VALIDATION ---------------------  */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [
						'name',
						'image',
						'originalName',
						'amount',
						'unit',
						'fullUnitName',
						'shortUnitName',
						'metaInformation',
					];
					if (validateSchema(schemas, req)) return true;
				}),

				/* --------------------- END OF SCHEMA VALIDATION ---------------------  */

				/* --------------------- name VALIDATION ---------------------  */
				body('name', 'name must be exists and be of type String').optional().isString(),
				body('name.length', 'name of ingredient cannot be empty string').not().equals('0'),

				/* --------------------- image VALIDATION --------------------- */

				/* --------------------- originalName VALIDATION --------------------- */

				body('originalName', 'originalName must be of type String').optional().isString(),

				body('name.length', 'originalName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(''),

				body('name.length', 'originalName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(' '),

				/* --------------------- amount VALIDATION --------------------- */
				body('amount', 'amount must be of type float or integer like 3.5 or 3')
					.optional()
					.isFloat(),

				/* --------------------- unit VALIDATION --------------------- */
				body('unit', 'unit must be of type String').optional().isString(),
				body('unit', 'unit of ingredient cannot be empty string').optional().not().equals(''),

				body('unit', 'unit of ingredient cannot be empty string').optional().not().equals(' '),

				/* --------------------- fullUnitName VALIDATION --------------------- */
				body('fullUnitName', 'fullUnitName must be of type String').optional().isString(),
				body('fullUnitName', 'fullUnitName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(''),

				body('fullUnitName', 'fullUnitName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(' '),

				/* --------------------- shortUnitName VALIDATION --------------------- */
				body('shortUnitName', 'shortUnitName must be of type String').optional().isString(),
				body('shortUnitName', 'shortUnitName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(''),

				body('shortUnitName', 'shortUnitName of ingredient cannot be empty string')
					.optional()
					.not()
					.equals(' '),
				/* --------------------- metaInformation VALIDATION --------------------- */
				body('metaInformation.length', 'metaInformation of ingredient cannot be empty list')
					.optional()
					.not()
					.equals('0'),
				body('metaInformation')
					.optional()
					.custom((value, { req }) => {
						//checking that all the metaInfo are string
						value.forEach((meta) => {
							if (typeof meta != 'string') throw new Error('metaInfo must be of type string');
							else if (meta === '' || meta === ' ')
								throw new Error('metaInfo cannot be empty String');
						});
						return true;
					}),
			];
		}
	}
};
module.exports = validate;
