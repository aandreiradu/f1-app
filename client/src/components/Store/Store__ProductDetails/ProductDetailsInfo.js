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
	ProductDetailsSizeContainer,
	OutOfStock,
	RiskStock
} from './ProductDetailsInfo.styles';

const ProductDetailsInfo = ({ product, teamLogo, onSizeSelected, isSelected }) => {
	const [riskStock, setRiskStock] = useState({
		show: false,
		message: null
	});
	console.log('@@@ ProductDetailsInfoproduct ProductDetailsInfo', product);
	const { title, price, description, details, sizeAndAvailability, hasSize } = product || {};

	console.log('@here sizeAndAvailability', sizeAndAvailability);

	const handleSizeSelection = (size) => {
		console.log('size received', size);

		const lessProducts = sizeAndAvailability?.find(
			(p) => p?.size.toLowerCase() === size?.toLowerCase()
		)?.availability;

		console.log('lessProducts', lessProducts);
		if (lessProducts && lessProducts <= 5 && hasSize) {
			console.log('da da da');
			setRiskStock({
				show: true,
				message: `Hurry, we have only ${lessProducts} ${
					lessProducts <= 1 ? 'product' : 'products'
				} left in stock`
			});
		} else {
			setRiskStock({
				show: false,
				message: null
			});
		}
		onSizeSelected(size);
	};

	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});

	console.log('sizeAndAvailability', sizeAndAvailability);

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
			{sizeAndAvailability?.length > 0 ? (
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
			) : (
				sizeAndAvailability?.length === 0 && hasSize && <OutOfStock>Out Of Stock</OutOfStock>
			)}
			{riskStock?.show && <RiskStock>{riskStock?.message}</RiskStock>}
		</ProductDetailsInfoContainer>
	);
};

export default ProductDetailsInfo;
