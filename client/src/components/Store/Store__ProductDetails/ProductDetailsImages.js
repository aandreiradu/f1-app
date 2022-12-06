import apiConfig from '../../../constants/apiConfig';
import { ProductDetailsImage, ProductDetailsImageContainer } from './ProductDetailsImages.styles';

const ProductDetailsImages = ({ imageUrl, productName }) => {
	console.log({ imageUrl, productName });
	return (
		<ProductDetailsImageContainer>
			<ProductDetailsImage
				src={imageUrl ? `${apiConfig.baseURL}/${imageUrl}` : ''}
				alt={productName || 'Product Image'}
			/>
		</ProductDetailsImageContainer>
	);
};

export default ProductDetailsImages;
