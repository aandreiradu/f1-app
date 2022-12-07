import {
	ProductDetailsHeaderContainer,
	ProductDetailsHeaderTeamLogo,
	ProductDetailsHeaderTeamName
} from './ProductDetails__header.styles';
import apiConfig from '../../../constants/apiConfig';

const ProductDetailsHeader = ({ team }) => {
	const { name, logoUrl, _id, teamFullName } = team;

	return (
		<ProductDetailsHeaderContainer _id={_id}>
			<ProductDetailsHeaderTeamLogo
				src={logoUrl ? `${apiConfig.baseURL}/${logoUrl}` : ''}
				alt={`${name} Logo` || 'Team Logo'}
			/>
			<ProductDetailsHeaderTeamName>{teamFullName || name || 'N/A'}</ProductDetailsHeaderTeamName>
		</ProductDetailsHeaderContainer>
	);
};

export default ProductDetailsHeader;
