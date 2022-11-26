import StoreItem from '../../components/Store/StoreItem';
import {
	StoreGlobalSettings,
	StoreMainContainer,
	StoreHeader,
	StoreSubHeader
} from './Store.styles';

import StoreSearch__Filter from '../../components/Store/StoreSearch__Filter/StoreSearch__Filter';
import ShopByTeam from '../../components/Store/Store__ShopByTeam/ShopByTeam';

const Store = () => {
	return (
		<>
			<StoreGlobalSettings />
			<StoreMainContainer>
				{/* Store Header */}
				<StoreHeader>F1 © Official Store</StoreHeader>
				<StoreSubHeader>Support your favorite team</StoreSubHeader>

				{/* Search and Filter */}
				<StoreSearch__Filter />

				{/* Shop By Team */}
				<StoreSubHeader>Shop by Team</StoreSubHeader>
				<ShopByTeam />
			</StoreMainContainer>
		</>
	);
};

export default Store;
