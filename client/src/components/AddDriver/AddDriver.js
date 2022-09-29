import React from 'react';
import {
	AddDriverContainer,
	AddDriverPictureWrapper,
	AddDriverProfilePicture,
	AddDriverPictureLabel,
	AddDriverPicture,
	AddDriverInfo
} from './AddDriver.styles';
import { default as AddDriverItem } from '../../components/UserProfileEdit/UserProfileEditItem';
import { SaveChangesBtn } from '../UserProfileEdit/UserProfileEdit.styles';
import useInput from '../../hooks/useInput';
import { validateName } from '../../Utils/validators';
import { validateDateOfBirthday, validateOnlyDigits } from '../../Utils/validators';

const AddDriver = () => {
	const {
		value: driverFirstNameValue,
		isValid: driverFirstNameIsValid,
		changeHandler: driverFirstNameChangeHandler,
		blurHandler: driverFirstNameBlurHandler,
		isTouched: driverFirstNameIsTouched,
		reset: driverFirstNameReset
	} = useInput((value) => validateName(value));
	const {
		value: driverLastNameValue,
		isValid: driverLastNameIsValid,
		changeHandler: driverLastNameChangeHandler,
		blurHandler: driverLastNameBlurHandler,
		isTouched: driverLastNameIsTouched,
		reset: driverLastNameReset
	} = useInput((value) => validateName(value));
	const {
		value: driverNumberValue,
		isValid: driverNumberIsValid,
		changeHandler: driverNumberChangeHandler,
		blurHandler: driverNumberBlurHandler,
		isTouched: driverNumberIsTouched,
		reset: driverNumberReset
	} = useInput((value) => validateOnlyDigits(value));
	const {
		value: driverDOBValue,
		isValid: driverDOBIsValid,
		changeHandler: driverDOBChangeHandler,
		blurHandler: driverDOBBlurHandler,
		isTouched: driverDOBIsTouched,
		reset: driverDOBReset
	} = useInput((value) => validateDateOfBirthday(value));
	const {
		value: driverNationalityValue,
		isValid: driverNationalityIsValid,
		changeHandler: driverNationalityChangeHandler,
		blurHandler: driverNationalityBlurHandler,
		isTouched: driverNationalityIsTouched,
		reset: driverNationalityReset
	} = useInput((value) => validateName(value));

	console.log({
		driverFirstNameValue,
		driverLastNameValue,
		driverDOBValue,
		driverNumberValue,
		driverNationalityValue
	});

	let canSubmit = false;

	if (
		driverFirstNameIsValid &&
		driverLastNameIsValid &&
		driverDOBIsValid &&
		driverNationalityIsValid
	) {
		canSubmit = true;
	}

	return (
		<AddDriverContainer>
			<AddDriverPictureWrapper>
				<AddDriverProfilePicture />
				<AddDriverPictureLabel></AddDriverPictureLabel>
				<AddDriverPicture />
			</AddDriverPictureWrapper>
			<AddDriverInfo>
				<h2>Test Driver First Name</h2>
				<span>Test Driver Last Name</span>
			</AddDriverInfo>

			{/* INPUTS */}
			<AddDriverItem
				id="driverFirstName"
				value={driverFirstNameValue}
				changeHandler={driverFirstNameChangeHandler}
				blurHandler={driverFirstNameBlurHandler}
				isTouched={driverFirstNameIsTouched}
				isValid={driverFirstNameIsValid}
				labelText="First Name"
				isRequired={true}
				errorText={'Invalid format'}
			/>
			<AddDriverItem
				id="driverLastName"
				value={driverLastNameValue}
				changeHandler={driverLastNameChangeHandler}
				blurHandler={driverLastNameBlurHandler}
				isTouched={driverLastNameIsTouched}
				isValid={driverLastNameIsValid}
				labelText="Last Name"
				isRequired={true}
				errorText={'Invalid format'}
			/>
			<AddDriverItem
				id="driverNumber"
				value={driverNumberValue}
				changeHandler={driverNumberChangeHandler}
				blurHandler={driverNumberBlurHandler}
				isTouched={driverNumberIsTouched}
				isValid={driverNumberIsValid}
				labelText="Number"
				isRequired={true}
				errorText={'Invalid format'}
			/>
			<AddDriverItem
				id="driverDOB"
				value={driverDOBValue}
				changeHandler={driverDOBChangeHandler}
				blurHandler={driverDOBBlurHandler}
				isTouched={driverDOBIsTouched}
				isValid={driverDOBIsValid}
				labelText="Date Of Birth"
				isRequired={true}
				errorText={'Invalid format'}
				type="date"
			/>
			<AddDriverItem
				id="driverNationality"
				value={driverNationalityValue}
				changeHandler={driverNationalityChangeHandler}
				blurHandler={driverNationalityBlurHandler}
				isTouched={driverNationalityIsTouched}
				isValid={driverNationalityIsValid}
				labelText="Nationality"
				isRequired={true}
				errorText={'Invalid format'}
				type="text"
			/>
			<SaveChangesBtn disabled={!canSubmit}>Submit</SaveChangesBtn>
		</AddDriverContainer>
	);
};

export default AddDriver;
