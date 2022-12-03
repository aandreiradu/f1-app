import { useState, useEffect } from 'react';
import { acceptedExtensions } from '../../Utils/acceptedProfilePictureExtensions';
import isLength from 'validator/lib/isLength';
import trim from 'validator/lib/trim';
import addProductsValidations from '../../Utils/validationsConfig/adminAddProducts.validations';
import Footer from '../../components/Footer/Footer';
import { StoreGlobalSettings } from '../Shop/Shop.styles';
import {
	AddProductForm,
	AddProductActionGroup,
	AddProductActionInput,
	AddProductActionLabel,
	AddProductButton,
	AddProductsErrorFallback
} from './AdminAddProducts.styles';
import useInput from '../../hooks/useInput';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';

const AdminAddProducts = () => {
	const [selectedTeam, setSelectedTeam] = useState({});
	/* Title */
	const {
		value: valueTitle,
		isValid: isValidTitle,
		hasError: hasErrorTitle,
		changeHandler: changeHandlerTitle,
		blurHandler: blurHandlerTitle,
		isTouched: isTouchedTitle
	} = useInput((inputValue) => trim(inputValue) && isLength(inputValue, { min: 3 }));
	/* Price*/
	const {
		value: valuePrice,
		isValid: isValidPrice,
		hasError: hasErrorPrice,
		changeHandler: changeHandlerPrice,
		blurHandler: blurHandlerPrice,
		isTouched: isTouchedPrice
	} = useInput((inputValue) => trim(inputValue) && inputValue >= 0);
	/* Description */
	const {
		value: valueDescription,
		isValid: isValidDescription,
		hasError: hasErrorDescription,
		changeHandler: changeHandlerDescription,
		blurHandler: blurHandlerDescription,
		isTouched: isTouchedDescription
	} = useInput((inputValue) => trim(inputValue) && isLength(inputValue, { min: 3 }));

	/* Details */
	const { value: valueDetails, changeHandler: changeHandlerDetails } = useInput(() => {});

	/* Image */
	const {
		value: valueImage,
		isValid: isValidImage,
		hasError: hasErrorImage,
		changeHandler: changeHandlerImage,
		blurHandler: blurHandlerImage,
		isTouched: isTouchedImage
	} = useInput((inputToValidate) => {
		console.log('inputToValidate', inputToValidate);
		if (inputToValidate && inputToValidate?.target?.files[0]) {
			const uploadedPicture = inputToValidate?.target?.files[0];
			const fileExtension = uploadedPicture && uploadedPicture?.name?.split('.').pop();
			const fileSize = uploadedPicture && uploadedPicture?.size?.toString();

			return true;
		}
	}, 'image');

	console.log('@@@Image', {
		valueImage,
		isValidImage,
		hasErrorImage
	});

	useEffect(() => {
		console.log('selectedTeam AdminAddProducts', selectedTeam);
	}, [selectedTeam]);

	let canSubmit = false;

	const addProductHandler = (e) => {
		e.preventDefault();
		console.log('triggered form submit');
	};

	return (
		<>
			<StoreGlobalSettings />
			<AddProductForm onSubmit={addProductHandler}>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="title">
						Team <span style={{ color: 'red' }}>*</span>
					</AddProductActionLabel>
					<CustomDropdown onTeamSelected={setSelectedTeam} />
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="title">
						Title <span style={{ color: 'red' }}>*</span>
					</AddProductActionLabel>
					<AddProductActionInput
						id="title"
						name="title"
						type="text"
						spellCheck="false"
						value={valueTitle}
						onChange={changeHandlerTitle}
						onBlur={blurHandlerTitle}
						isValid={isValidTitle}
						hasError={hasErrorTitle}
						isTouched={isTouchedTitle}
						autocomplete="off"
						required
					/>
					{hasErrorTitle && (
						<AddProductsErrorFallback>
							{addProductsValidations['title'].errorDescription}
						</AddProductsErrorFallback>
					)}
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="price">
						Price <span style={{ color: 'red' }}>*</span>
					</AddProductActionLabel>
					<AddProductActionInput
						value={valuePrice}
						id="price"
						name="price"
						type="number"
						spellCheck="false"
						onChange={changeHandlerPrice}
						onBlur={blurHandlerPrice}
						hasError={hasErrorPrice}
						isValid={isValidPrice}
						isTouched={isTouchedPrice}
						min="0"
						required
					/>
					{hasErrorPrice && (
						<AddProductsErrorFallback>
							{addProductsValidations['price'].errorDescription}
						</AddProductsErrorFallback>
					)}
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="description">
						Description <span style={{ color: 'red' }}>*</span>
					</AddProductActionLabel>
					<AddProductActionInput
						type="text"
						id="description"
						name="description"
						value={valueDescription}
						onChange={changeHandlerDescription}
						onBlur={blurHandlerDescription}
						isValid={isValidDescription}
						hasError={hasErrorDescription}
						isTouched={isTouchedDescription}
						spellCheck="false"
						autoComplete="false"
						required
					/>
					{hasErrorDescription && (
						<AddProductsErrorFallback>
							{addProductsValidations['description'].errorDescription}
						</AddProductsErrorFallback>
					)}
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="details">Details</AddProductActionLabel>
					<AddProductActionInput
						value={valueDetails}
						id="details"
						name="details"
						type="text"
						spellCheck="false"
						onChange={changeHandlerDetails}
					/>
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="image">
						Image <span style={{ color: 'red' }}>*</span>
					</AddProductActionLabel>
					<AddProductActionInput
						// value={valueImage}
						id="image"
						name="image"
						type="file"
						required
						onChange={changeHandlerImage}
						onBlur={blurHandlerImage}
						isValid={isValidImage}
						hasError={hasErrorImage}
						isTouched={isTouchedImage}
					/>
				</AddProductActionGroup>
				{/* </fieldset> */}
				<AddProductButton type="submit" disabled={!canSubmit}>
					Add Product
				</AddProductButton>
			</AddProductForm>
			<Footer />
		</>
	);
};

export default AdminAddProducts;
