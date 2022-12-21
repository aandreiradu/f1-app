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
import { useNavigate } from 'react-router-dom';
import SizeAvailability from '../../components/AdminAddProducts__Size&Availability/SizeAvailability';
import SizeAvailabilityItem from '../../components/AdminAddProducts__Size&Availability/SizeAvailabilityItem';
import { removeIndexes } from '../../Utils/admin/removeIndexes_addProducts';

const AdminAddProducts = () => {
	const [noSizeItem, setNoSizeItem] = useState(false);
	const [canSubmitActivities, setCanSubmitActivities] = useState(false);
	const { sendRequest, error } = useAxiosInterceptors();
	const [activities, setActivities] = useState([
		{
			index: 0,
			size: null,
			availability: null
		}
	]);
	const [showModal, setShowModal] = useState({
		show: false,
		title: null,
		message: null
	});
	const [selectedTeam, setSelectedTeam] = useState({});
	const [productImage, setProductImage] = useState({
		file: null,
		isValid: false,
		errorDescription: null,
		isTouched: false
	});
	const navigate = useNavigate();

	const closeModal = () =>
		setShowModal({
			show: false,
			title: null,
			message: null
		});

	useEffect(() => {
		const { message, status, data } = error || {};

		switch (status) {
			case 403:
				console.log('switch case 403');
				console.log({ message, status, data });
				if (message === 'This account is not authorized to add products to the shop') {
					console.log('@@@if This account is not authorized to add products to the shop');
					setShowModal({
						show: true,
						title: 'Unauthorized',
						message: message
					});
					setTimeout(() => {
						navigate('/');
					}, 2000);
					break;
				}
				break;

			case 401:
				console.log('switch case 401');
				console.log({ message, status, data });
				if (message === 'No account asociated with the requested userId') {
					console.log('@@@if No account asociated with the requested userId');
					setShowModal({
						show: true,
						title: 'Unauthorized',
						message: message
					});
					setTimeout(() => {
						navigate('/');
					}, 2000);
					break;
				}
				break;

			case 400:
				console.log('switch case 400');
				console.log({ message, status, data });
				if (
					message === 'Invalid request params. TeamId not found' ||
					message === 'No team found for provided teamId' ||
					message === 'Invalid request params on Create Product'
				) {
					console.log('@@@if Invalid request params. TeamId not found');
					setShowModal({
						show: true,
						title: 'Ooops',
						message: message
					});
					setTimeout(() => {
						navigate('/');
					}, 2000);
					break;
				}
				break;

			case 422:
				console.log('switch case 422');
				console.log({ message, status, data });
				// if (message === 'Validation failed. Entered data is not in correct format') {
				// 	console.log('@@@if Validation failed. Entered data is not in correct format');
				// 	setShowModal({
				// 		show: true,
				// 		title: 'Something went wrong',
				// 		message: message
				// 	});
				// 	break;
				// }
				setShowModal({
					show: true,
					title: 'Something went wrong',
					message: message
				});
				break;

			default:
				return;
		}
	}, [error, navigate]);

	/* Title */
	const {
		value: valueTitle,
		isValid: isValidTitle,
		hasError: hasErrorTitle,
		changeHandler: changeHandlerTitle,
		blurHandler: blurHandlerTitle,
		isTouched: isTouchedTitle,
		reset: resetTitle
	} = useInput((inputValue) => trim(inputValue) && isLength(inputValue, { min: 3 }));
	/* Price*/
	const {
		value: valuePrice,
		isValid: isValidPrice,
		hasError: hasErrorPrice,
		changeHandler: changeHandlerPrice,
		blurHandler: blurHandlerPrice,
		isTouched: isTouchedPrice,
		reset: resetPrice
	} = useInput((inputValue) => trim(inputValue) && inputValue >= 0);
	/* Description */
	const {
		value: valueDescription,
		isValid: isValidDescription,
		hasError: hasErrorDescription,
		changeHandler: changeHandlerDescription,
		blurHandler: blurHandlerDescription,
		isTouched: isTouchedDescription,
		reset: resetDescription
	} = useInput((inputValue) => trim(inputValue) && isLength(inputValue, { min: 3 }));

	/* Details */
	const {
		value: valueDetails,
		changeHandler: changeHandlerDetails,
		reset: resetDetails
	} = useInput(() => {});

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
		canSubmitActivities
	) {
		console.log('submit', {
			selectedteam: Object.keys(selectedTeam).length > 0,
			team: selectedTeam?.teamId,
			image: productImage?.file,
			isValidTitle,
			isValidPrice,
			isValidDescription,
			canSubmitActivities
		});
		canSubmit = true;
	}

	const addProductHandler = (e) => {
		e.preventDefault();
		if (canSubmit) {
			const controller = new AbortController();
			const formData = new FormData();
			formData.append('title', valueTitle);
			formData.append('description', valueDescription);
			formData.append('price', valuePrice);
			formData.append('details', valueDetails);
			formData.append('teamId', selectedTeam?.teamId);
			formData.append('productPicture', productImage?.file);
			if (noSizeItem) {
				formData.append('itemWithNoSize', !noSizeItem);
			} else {
				formData.append('sizeAvailability', JSON.stringify(removeIndexes(activities)));
			}
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

						/* Rest Form Inputs after the product was created */
						resetTitle();
						resetDetails();
						resetPrice();
						resetDescription();
					}
				}
			);
		}
	};

	const addActivityHandler = () => {
		setActivities((prev) => [
			...prev,
			{
				index: +activities[activities.length - 1]?.index + 1,
				size: null,
				availability: null
			}
		]);
	};

	const removeActivityHandler = (activityItemIndex) => {
		console.log('remove this index', activityItemIndex);
		const filteredActivities = activities?.filter((item) => +item?.index !== +activityItemIndex);
		console.log('filteredActivities', filteredActivities);
		setActivities(filteredActivities);
	};

	const handleNoSizeItem = (e) => {
		console.log(e.target.checked);
		setNoSizeItem(e.target.checked);
		setCanSubmitActivities(true);
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
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
						width: '100%',
						justifyContent: 'flex-end'
					}}
				>
					<label htmlFor="noSizeItem">Item With No Size</label>
					<input name="noSizeItem" id="noSizeItem" type="checkbox" onChange={handleNoSizeItem} />
				</div>
				{!noSizeItem && (
					<SizeAvailability
						canSubmit="true"
						activities={activities}
						onSubmit={setCanSubmitActivities}
					>
						{activities?.map((activity) => (
							<SizeAvailabilityItem
								canBeRemoved={activities?.length > 1}
								key={activity?.index}
								index={activity?.index}
								configLeft={{
									dataSource: ['S', 'M', 'L', 'XL', 'XXL'],
									// .filter((size) => {
									// 	const isSelected = activities.find((act) => act.size === size);
									// 	console.log('isSelected', isSelected);
									// 	if (!isSelected) return size;
									// })
									dataOption: 'selector',
									onSizeSelected: setActivities,
									value: activity?.size || ''
								}}
								configRight={{
									dataOption: 'input',
									dataType: 'number',
									dataTypeConfig: {
										min: 1,
										max: 1000,
										value: activity?.availability || 'Product Availability',
										placeholder: 'Product Availability'
									},
									stateController: {
										setter: setActivities
									}
								}}
								onActivityAdded={addActivityHandler}
								onActivityRemoved={removeActivityHandler}
							/>
						))}
					</SizeAvailability>
				)}
				<AddProductButton type="submit" disabled={!canSubmit}>
					Add Product
				</AddProductButton>
			</AddProductForm>
			<Footer />
		</>
	);
};

export default AdminAddProducts;
