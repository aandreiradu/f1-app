import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { StoreGlobalSettings } from '../Shop/Shop.styles';
import {
	AddProductForm,
	AddProductActionGroup,
	AddProductActionInput,
	AddProductActionLabel,
	AddProductButton
} from './AdminAddProducts.styles';
import useInput from '../../hooks/useInput';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';

const AdminAddProducts = () => {
	const {
		value: valueTitle,
		isValid: isValidTitle,
		hasError: hasErrorTitle,
		changeHandler: changeHandlerTitle,
		blurHandler: blurHandlerTitle,
		isTouched: isTouchedTitle
	} = useInput(() => {});

	const addProductHandler = (e) => {
		e.preventDefault();
		console.log('triggered form submit');
	};

	return (
		<>
			<StoreGlobalSettings />
			<AddProductForm onSubmit={addProductHandler}>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="title">Team</AddProductActionLabel>
					<CustomDropdown />
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="title">Title</AddProductActionLabel>
					<AddProductActionInput id="title" name="title" type="text" spellCheck="false" />
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="price">Price</AddProductActionLabel>
					<AddProductActionInput id="price" name="price" type="number" spellCheck="false" />
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="description">Description</AddProductActionLabel>
					<AddProductActionInput
						id="description"
						name="description"
						type="text"
						spellCheck="false"
					/>
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="details">Details</AddProductActionLabel>
					<AddProductActionInput id="details" name="details" type="text" spellCheck="false" />
				</AddProductActionGroup>
				<AddProductActionGroup>
					<AddProductActionLabel htmlFor="image">Image</AddProductActionLabel>
					<AddProductActionInput id="image" name="image" type="file" />
				</AddProductActionGroup>
				<AddProductButton type="submit">Add Product</AddProductButton>
			</AddProductForm>
			<Footer />
		</>
	);
};

export default AdminAddProducts;
