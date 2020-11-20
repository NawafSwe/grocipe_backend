/* ----------------------------- File Explanation  -----------------------------
this file is holding helpers functions to form custom requests from the server API by getting benefit
from a response that returned by the server to get other useful responses */

/*----------------------------- Requiring Packages -----------------------------*/
const getRecipeInfoController = require('../controllers/spoonControllers/getRecipeInformation/getRecipeInformationController');
const getRecipes = require('../controllers/spoonControllers/searchByIngredients/searchByIngredientsController');
/*----------------------------- Helper Functions -----------------------------*/

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name getRecipeInfoByIds
 * @param {Object} id is the id of particular recipe
 * @return {Object} returns Object of new response that came from the endpoint 'getRecipeInformationByID'
 * @return {Object} return a message if the body does not exist
 * @throws {Error} throws an error if there is error.
 * @description  allows us to get benefit from the response returned from the 'searchByIngredients' controller
 * by taking the recipe id from the response then do another request to the endpoint 'getRecipeInformation' to get the recipe information
 */

const getRecipeInfoById = async (id) => {
	// checking if there is a id
	if (id) {
		try {
			const response = await getRecipeInfoController(id);
			const result = response;
			return result;
		} catch (e) {
			console.log(`error occurred in the spoonHelpers at getRecipeInfoById()  error: ${error}`);
			return { message: 'something went wrong' };
		}
	} else return { message: 'no body was provided' };
};

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name getCustomRecipeInfo
 * @param {Object} body is the data
 * @return {Object} returns Object of new response that came from the endpoint 'getRecipeInformationByID'
 * @return {Object} return a message if the body does not exist
 * @throws {Error} throws an error if there is error.
 * @description get custom info about recipes
 */
/**
 *
 * @param body
 * @returns {Promise<{[p: string]: *}>}
 */
/*
simple json response
    "vegetarian": false,
    "vegan": false,
    "glutenFree": true,
    "veryHealthy": false,
    "preparationMinutes": 1,
    "cookingMinutes": 0,
    "healthScore": 25,
    "sourceUrl": "http://www.agirlworthsaving.net/2012/06/meal-plan-slow-cooker-paleo-recipes.html",
     "id": 793712,
     "title": "Easy Meat Lover’s Pizza",
      "image": "https://spoonacular.com/recipeImages/793712-312x231.jpg",
      "likes": 96
*/
const getCustomRecipeInfo = async (body) => {
	try {
		let recipeArray = [];
		//brief recipe info will returns an array of recipes [{id: ...}]
		//for each recipe fetch its info and put it inside a new json object after that return an array of it
		const briefRecipeInfo = await getRecipes(body);

		for (let recipe of briefRecipeInfo) {
			//putting all info about the recipe;
			let recipeObj = { ...recipe };
			//fetching additional info about recipe
			const recipeInfo = await getRecipeInfoController({ recipeId: recipeObj.id });
			//merging the fetched info
			recipeObj = { ...recipeObj, ...recipeInfo };
			//pushing the recipe to the array
			recipeArray.push(recipeObj);

		}
		//returning array of recipes
		return recipeArray;

	} catch (e) {
		console.log(`error occurred in the spoonHelpers at getCustomRecipeInfo()  error: ${e}`);
		return { message: 'something went wrong' };
	}
};


/*----------------------------- Exports Helper Functions -----------------------------*/
module.exports = { getRecipeInfoById, getCustomRecipeInfo };

