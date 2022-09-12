import { useState } from 'react'

const useInput = (validator) => {
    const [isTouched, setIsTouched] = useState(false);
    const [enteredValue, setEnteredValue] = useState('');


    const inputBlurHandler = () => setIsTouched(true);
    const inputChangeHandler = (e) => setEnteredValue(e.target.value);

    const isValid = validator(enteredValue);
    const hasError = !isValid && isTouched;

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        changeHandler: inputChangeHandler,
        blurHandler: inputBlurHandler,
        isValid: isValid,
        hasError: hasError,
        isTouched,
        reset
    }

}

export default useInput