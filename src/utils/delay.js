const delay = (t) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(t), t);
	});
};

module.exports = delay;
