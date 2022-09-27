import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchDriverContainer, SearchDriverInput, SearchDriverIcon } from './SearchDriver.styles';

const SearchDriver = ({ onSearch }) => {
	const changeSearchHandler = (e) => onSearch(e.target.value.trim());

	return (
		<SearchDriverContainer>
			<SearchDriverInput
				placeholder={`${new Date().getFullYear()} Drivers Grid`}
				type="text"
				onChange={changeSearchHandler}
			/>
			{/* <SearchDriverIcon icon={faSearch} /> */}
		</SearchDriverContainer>
	);
};

export default SearchDriver;
