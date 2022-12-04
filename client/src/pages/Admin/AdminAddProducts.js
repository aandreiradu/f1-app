import { useState, useEffect } from 'react';
import ErrorModal from '../../components/UI/ErrorModal';
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
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';

const AdminAddProducts = () => {
	const [showModal, setShowModal] = useState({
		show: false,
		title: null,
		message: null
	});
	const { sendRequest, error, responseData } = useAxiosInterceptors();
	const [selectedTeam, setSelectedTeam] = useState({});
	const [productImage, setProductImage] = useState({
		file: null,
		isValid: false,
		errorDescription: null,
		isTouched: false
	});

	const closeModal = () =>
		setShowModal({
			show: false,
			title: null,
			message: null
		});

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

	const insertImageHandler = (e) => {
		console.log('file', e.target.files[0]);
		const uploadedPicture = e?.target?.files[0];
		const fileExtension = uploadedPicture && uploadedPicture?.name?.split('.').pop();
		const fileSize = uploadedPicture && uploadedPicture?.size?.toString();
		console.log('fileExtension', fileExtension);

		// check for accepted extensions;
		if (!acceptedExtensions?.some((ext) => fileExtension?.toLowerCase() === ext)) {
			setProductImage((prev) => {
				return {
					...prev,
					isValid: false,
					file: null,
					isTouched: true,
					errorDescription: addProductsValidations['image'].errorExtension
				};
			});
			e.target.value = null;
			return;
		}

		if (fileSize.length < 7) {
			const fileSizeKB = Math.round(+fileSize / 1024).toFixed(2);
			if (fileSizeKB > 2000) {
				setProductImage((prev) => {
					return {
						...prev,
						isValid: false,
						file: null,
						isTouched: true,
						errorDescription: addProductsValidations['image'].errorFileSize
					};
				});
				e.target.value = null;
				return;
			}
		} else {
			const fileSizeMB = (Math.round(+fileSize / 1024) / 1000).toFixed(2);
			console.log('fileSizeMB', fileSizeMB);
			if (fileSizeMB > 2)
				setProductImage((prev) => {
					return {
						...prev,
						isValid: false,
						file: null,
						isTouched: true,
						errorDescription: addProductsValidations['image'].errorFileSize
					};
				});
			e.target.value = null;
			return;
		}

		setProductImage((prev) => {
			return {
				...prev,
				isValid: true,
				file: uploadedPicture,
				isTouched: true,
				errorDescription: null
			};
		});
	};

	let canSubmit = false;

	// Check if the user cand submit the form (all required fields should be completed & valid)
	if (
		Object.keys(selectedTeam).length > 0 &&
		selectedTeam?.teamId &&
		productImage?.file &&
		isValidTitle &&
		isValidPrice &&
		isValidDescription
	) {
		canSubmit = true;
	}

	const addProductHandler = (e) => {
		e.preventDefault();
		console.log('triggered form submit');

		// if (canSubmit) {
		console.log('can submit', canSubmit);

		const controller = new AbortController();
		const formData = new FormData();
		formData.append('title', valueTitle);
		formData.append('description', valueDescription);
		formData.append('price', valuePrice);
		formData.append('details', valueDetails);
		formData.append('teamId', selectedTeam?.teamId);
		formData.append('productPicture', productImage?.file);
		console.log('makeRequest with this', JSON.stringify(formData));
		console.log('makeRequest with this', formData);

		sendRequest(
			{
				url: '/shop/createProduct',
				method: 'POST',
				body: formData,
				withCredentials: true,
				signal: controller.signal
			},
			(responseData) => {
				console.log('responseData', responseData);
				const { message, status } = responseData;

				if (status === 200 && message === 'Product created successfully') {
					setShowModal({
						show: true,
						title: '',
						message: 'Product created successfully'
					});
				}
			}
		);
		// }
	};

	return (
		<>
			<StoreGlobalSettings />

			{showModal?.show && (
				<ErrorModal title={showModal?.title} message={showModal?.message} onConfirm={closeModal} />
			)}

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
						step="any"
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
						placeholder="Insert multiple product details and separate with commas"
					/>
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="image">
						Image <span style={{ color: 'red' }}>*</span>
					</AddProductActionLabel>
					<AddProductActionInput
						id="image"
						name="image"
						type="file"
						required
						onChange={insertImageHandler}
						hasError={!productImage?.isValid}
						isTouched={productImage?.isTouched}
					/>
					{!productImage?.isValid && productImage?.isTouched && (
						<AddProductsErrorFallback>
							{productImage?.errorDescription || 'Something went wrong, please try again later'}
						</AddProductsErrorFallback>
					)}
				</AddProductActionGroup>
				<AddProductButton type="submit" disabled={!canSubmit}>
					Add Product
				</AddProductButton>
			</AddProductForm>
			<Footer />
		</>
	);
};

export default AdminAddProducts;
