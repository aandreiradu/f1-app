import {
	StoreFilterContainer,
	StoreSearchConatainer,
	StoreSearchInput,
	StoreSearchInputIcon,
	StoreSearchFilterContainer,
	StoreFilterIcon
} from './StoreSearch__Filter.styles';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';

const StoreSearch__Filter = () => {
	return (
		<>
			<StoreSearchFilterContainer>
				<StoreSearchConatainer>
					<StoreSearchInputIcon icon={faMagnifyingGlass} />
					<StoreSearchInput type="text" spellCheck="false" placeholder="Search" />
				</StoreSearchConatainer>
				<StoreFilterContainer>
					<StoreFilterIcon icon={faSliders} />
				</StoreFilterContainer>
			</StoreSearchFilterContainer>
		</>
	);
};

export default StoreSearch__Filter;
