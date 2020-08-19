/* ----------------------------- File Explanation  -----------------------------
this file is holding helpers functions to form custom requests from the server API by getting benefit
from a response that returned by the server to get other useful responses */

/*----------------------------- Requiring Packages -----------------------------*/
const getRecipeInfoController = require('../controllers/spoonControllers/getRecipeInformation/getRecipeInformationController');

/*----------------------------- Helper Functions -----------------------------*/

/** 'getRecipeInfoByIds' helper function that allows us to get benefit from the response returned from the 'searchByIngredients' controller 
 * by taking the recipe id from the response then do another request to the endpoint 'getRecipeInformation' to get the recipe information
 * 
 * @param {Object} id is the id of particular recipe 
 * @return {Object} returns Object of new response that came from the endpoint 'getRecipeInformationByID'
 * @return {Object} return a message if the body does not exist
 */


const getRecipeInfoById = async (id) => {
	// checking if there is a id
	if (id) {
		try{
			const response = await getRecipeInfoController(id);
			const result = response.data;
			return result;
		}catch(e){
			print(`error happen in the `)
			return { message: 'something went wrong' };
		}
	
} else
return { message: 'no body was provided' };
};


/*----------------------------- Exports Helper Functions -----------------------------*/
module.exports = { getRecipeInfoById };
