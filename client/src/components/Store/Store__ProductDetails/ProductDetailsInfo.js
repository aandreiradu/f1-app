import { useEffect } from 'react';
import { useState } from 'react';
import apiConfig from '../../../constants/apiConfig';
import {
	ProductDetailsInfoContainer,
	ProductDetailsInfoPrice,
	ProductDetailsInfoTitle,
	LicensedGearContainer,
	ProductDetailsInfoTitlePrice,
	ProductDetailsInfoDescription,
	ProductDetailsSizes,
	ProductDetailsSizeItem,
	ProductDetailsSizeContainer
} from './ProductDetailsInfo.styles';

const ProductDetailsInfo = ({ product, teamLogo, onSizeSelected, isSelected }) => {
	console.log('@@@ ProductDetailsInfoproduct ProductDetailsInfo', product);
	const { title, price, description, details, sizeAndAvailability } = product || {};

	const handleSizeSelection = (size) => {
		console.log('size received', size);
		onSizeSelected(size);
	};

	return (
		<ProductDetailsInfoContainer>
			<LicensedGearContainer>
				<img src={teamLogo ? `${apiConfig.baseURL}/${teamLogo}` : ''} />
				<p>Officially licensed gear</p>
			</LicensedGearContainer>
			<ProductDetailsInfoTitlePrice>
				<ProductDetailsInfoTitle>{title || 'N/A'}</ProductDetailsInfoTitle>
				<ProductDetailsInfoPrice>{price || 'N/A'}€</ProductDetailsInfoPrice>
			</ProductDetailsInfoTitlePrice>
			<ProductDetailsInfoDescription>{description}</ProductDetailsInfoDescription>
			{sizeAndAvailability?.length > 0 && (
				<ProductDetailsSizes>
					<p>Size</p>
					<ProductDetailsSizeContainer>
						{sizeAndAvailability?.map((item, index) => (
							<ProductDetailsSizeItem
								key={index}
								size={item?.size}
								onClick={handleSizeSelection.bind(this, item?.size)}
								isSelected={isSelected === item?.size}
								disabled={+item?.availableQuantity === 0}
							>
								{item?.size}
							</ProductDetailsSizeItem>
						))}
					</ProductDetailsSizeContainer>
				</ProductDetailsSizes>
			)}
		</ProductDetailsInfoContainer>
	);
};

export default ProductDetailsInfo;
