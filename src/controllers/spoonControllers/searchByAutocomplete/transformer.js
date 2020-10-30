/** @author Nawaf ALhsarqi.
 * @async
 * @function
 * @name transformer
 * @param {Promise<Response>} result received result from api.
 * @returns {Promise<Object>} cleaned data of type js object.
 * @throws {Error} error message if there is an error.
 * @description transform data and make it more cleaner in a specific order.
 **/

const transformer = (result) => {
	try {
		const standardResult = result.map((target) => {
			return { id: target.id, title: target.title };
		});
		return standardResult;
	} catch (e) {
		console.log('Error occurred in searchByAutocomplete transformer', e);
	}
};

module.exports = transformer;
