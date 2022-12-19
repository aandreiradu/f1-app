const removeIndexes = (activities) => {
	const withoutIdx = activities.map((item) => {
		return {
			size: item?.size,
			availability: item?.availability
		};
	});
	return withoutIdx;
};

export { removeIndexes };
