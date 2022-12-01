import React from 'react';
import {
	SBTProductImage,
	SBTProductItem,
	ShopByTeamProductItemWrapper,
	SBTProductInfo,
	SBTProductPrice,
	SBTProductTitle,
	SBTProductDescription
} from './ShopByTeamProductItem.styles';
import apiConfig from '../../../constants/apiConfig';

const ShopByTeamProductItem = ({ products }) => {
	console.log('products props', products);
	return (
		<ShopByTeamProductItemWrapper>
			{products?.map((product, index) => (
				<SBTProductItem key={product?._id || index}>
					<SBTProductImage
						src={product?.imageUrl ? `${apiConfig.baseURL}/${product?.imageUrl}` : ''}
						alt={`${product?.title} Product Image` || 'Product Image'}
					/>
					<SBTProductInfo>
						<SBTProductPrice>Price {product?.price || 'N/A'} €</SBTProductPrice>
						<SBTProductTitle>{product?.title || 'N/A'}</SBTProductTitle>
						{/* <SBTProductDescription>{product?.description || 'N/A'}</SBTProductDescription> */}
					</SBTProductInfo>
				</SBTProductItem>
			))}
		</ShopByTeamProductItemWrapper>
	);
};

export default ShopByTeamProductItem;
