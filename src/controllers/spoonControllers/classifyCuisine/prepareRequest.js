/*--------------- implementing the end point for spoon api ---------------*/

/* Classify Cuisine endpoint */

/* the final request from must be like this  
title=Pork roast with green beans
ingredientList=3 oz
pork shoulder

it should follow the order where title must comes first;
                  
*/

const prepareRequest = (body) => {
	try {
		const spoonKey = process.env.API_KEY_SPOON || '',
			spoonHost = 'https://api.spoonacular.com/recipes/cuisine';
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
		console.log('error occurred in spoon classifyCuisine prepareRequest', e);
	}
};

module.exports = prepareRequest;
