/*--------------- implementing the end point for spoon api ---------------*/
/* Guess Nutrition by Dish Name  endpoint*/
const prepareRequest = (body) => {
	try {
		const spoonKey = process.env.API_KEY_SPOON || '',
			spoonHost = 'https://api.spoonacular.com/recipes/guessNutrition';
		let paramString = `title=${body.title}`;
		return `${spoonHost}?${paramString}&apiKey=${spoonKey}`;
	} catch (e) {
		console.log('error occurred in spoon guessNutritionByDishName prepareRequest', e);
	}
};

module.exports = prepareRequest;
