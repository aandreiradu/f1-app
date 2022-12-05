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

const ShopByTeamProductItem = ({ product, team }) => {
	const [isOpenDescription, setIsOpenDescription] = useState(false);

	const handleOpenDescription = (e) => {
		e.stopPropagation();
		setIsOpenDescription((prev) => !prev);
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
						<AddToCartButton>Add To Cart</AddToCartButton>
					</BottomAddToCart>
				</SBTProductInfo>
			</SBTProductItem>
		</>
	);
};

export default ShopByTeamProductItem;
