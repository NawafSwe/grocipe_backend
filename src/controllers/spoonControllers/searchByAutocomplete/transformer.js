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
