import { useState } from 'react';

const useInput = (validator, type) => {
	const [isTouched, setIsTouched] = useState(false);
	const [enteredValue, setEnteredValue] = useState('');

	const inputBlurHandler = () => setIsTouched(true);
	const inputChangeHandler = (e) => {
		if (type === 'image') {
			// console.log('setting state to this', e.target.files[0]);
			return setEnteredValue(e.target.files[0]);
		}
		return setEnteredValue(e.target.value);
	};

	// console.log('trece in valid');

	const isValid = validator(enteredValue);
	// console.log('IS VALID FOR IMAGE', isValid);
	const hasError = !isValid && isTouched;

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		changeHandler: inputChangeHandler,
		blurHandler: inputBlurHandler,
		isValid: isValid,
		hasError: hasError,
		isTouched,
		reset
	};
};

export default useInput;
