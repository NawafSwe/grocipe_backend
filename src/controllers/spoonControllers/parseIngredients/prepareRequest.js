/*--------------- implementing the end point for spoon api ---------------*/

/* Parse Ingredients endpoint */

/* the final request from must be like this  
ingredientList=3 oz
pork shoulder
servings =2
it should follow the order where ingredientList must comes first;
*/

const prepareRequest = (body) => {
	try {
		const spoonHost = 'https://api.spoonacular.com/recipes/parseIngredients',
			spoonKey = process.env.API_KEY_SPOON || '';
		let paramString = '',
			isFirstItem = true,
			isFirstParam = true;
		for (let [key, value] of Object.entries(body)) {
			if (key === 'ingredientList') {
				value.forEach((ingredient) => {
					if (isFirstParam) {
						paramString += `${key}=${ingredient}`;
						isFirstParam = false;
						isFirstItem = false;
					} else {
						if (isFirstItem) {
							paramString += `\n${key}=${ingredient}`;
							isFirstItem = false;
						} else {
							paramString += `\n${ingredient}`;
						}
					}
				});
			} else {
				if (isFirstParam) {
					paramString += `${key}=${value}`;
					isFirstParam = false;
				} else paramString += `\n${key}=${value}`;
			}
		}
		return { data: paramString, url: `${spoonHost}?apiKey=${spoonKey}` };
	} catch (e) {
		console.log('error occurred in spoon parseIngredients prepareRequest ', e.message);
	}
};
module.exports = prepareRequest;
