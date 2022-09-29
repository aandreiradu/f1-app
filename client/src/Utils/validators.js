export const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

export const validatePassword = (password) => {
	const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	return regularExpression.test(password);
};

export const validateName = (name) => {
	const regex = /^[a-zA-Z ]*$/;
	return name.trim() && name.trim().length >= 2 && regex.test(name);
};

export const validateUserame = (name) => {
	const regex = new RegExp(/^[a-zA-z0-9-_.]*$/, 'i');
	return name.trim() && name.trim().length >= 5 && regex.test(name);
};

export const validateDateOfBirthday = (dob) => {
	const regex = new RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);

	return dob?.trim() && dob?.trim().length > 0 && regex.test(dob);
};

export const validateOnlyDigits = (number) => {
	const regex = new RegExp('^\\d+$');

	return number?.trim() && number?.trim().length > 0 && regex.test(number);
};
