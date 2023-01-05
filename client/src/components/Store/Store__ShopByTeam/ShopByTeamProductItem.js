import { useState } from 'react';
import {
	SBTProductImage,
	SBTProductItem,
	SBTProductInfo,
	SBTProductPrice,
	SBTProductTitle,
	SBTProductDescription,
	AddToCartButton,
	SBTDescriptionContainer,
	SBTDescriptionContent,
	SBTDescriptionIcon,
	BottomAddToCart,
	SBTProductImageWrapper
} from './ShopByTeamProductItem.styles';
import apiConfig from '../../../constants/apiConfig';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import ShopByTeamSelectSize from './ShopByTeamSelectSize';
import { useEffect } from 'react';

const ShopByTeamProductItem = ({ product, team }) => {
	const [openSelectSize, setOpenSelectSize] = useState(false);
	const [selectedSize, setSelectedSize] = useState('');
	const [isOpenDescription, setIsOpenDescription] = useState(false);

	const handleOpenDescription = (e) => {
		e.stopPropagation();
		setIsOpenDescription((prev) => !prev);
	};

	const addItemToCart = () => {
		if (!openSelectSize) {
			console.log('change state');
			setOpenSelectSize(true);
		} else {
			console.log('this is still open??');
			setOpenSelectSize(false);
		}
	};

	return (
		<>
			<SBTProductItem key={product?._id}>
				<SBTProductImageWrapper>
					<SBTProductImage
						src={product?.imageUrl ? `${apiConfig.baseURL}/${product?.imageUrl}` : ''}
						alt={`${product?.title} Product Image` || 'Product Image'}
					/>
				</SBTProductImageWrapper>
				<SBTProductInfo>
					<SBTProductPrice>Price {product?.price || 'N/A'} €</SBTProductPrice>
					<SBTProductTitle>{product?.title || 'N/A'}</SBTProductTitle>
					{product?.description && (
						<SBTDescriptionContainer onClick={handleOpenDescription} isOpen={isOpenDescription}>
							<SBTDescriptionContent>
								<p>Description</p>
								<SBTDescriptionIcon icon={isOpenDescription ? faMinus : faPlus} />
							</SBTDescriptionContent>
							{isOpenDescription && (
								<SBTProductDescription>{product?.description || 'N/A'}</SBTProductDescription>
							)}
						</SBTDescriptionContainer>
					)}
					<BottomAddToCart>
						<AddToCartButton
							disabled={product?.sizeAndAvailability?.length === 0 && product?.hasSize}
							onClick={addItemToCart}
						>
							Add To Cart
						</AddToCartButton>
					</BottomAddToCart>
				</SBTProductInfo>
				{openSelectSize && <ShopByTeamSelectSize onClose={setOpenSelectSize} product={product} />}
			</SBTProductItem>
		</>
	);
};

export default ShopByTeamProductItem;
