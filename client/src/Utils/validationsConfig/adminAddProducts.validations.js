const addProductsValidations = {
	team: {
		errorDescription: 'This product must be associated with a team. Please select the team'
	},

	title: {
		errorDescription: 'Product Title should be at least 3 characters long, without white spaces'
	},

	description: {
		errorDescription:
			'Product description should be at least 3 characters longs, without white spaces'
	},
	price: {
		errorDescription: 'Price should be a positive number'
	},

	details: {
		errorDescription:
			'Product details should contain at least 1 detail. If you want to enter more details, you can separate them with commas'
	},

	image: {
		errorDescription: 'Product image is mandatory',
		errorExtension: 'Invalid image format. Accepted formats : .jpg,.jpeg,.png',
		errorFileSize: "Can't upload files larget than 2mb "
	}
};

module.exports = addProductsValidations;
