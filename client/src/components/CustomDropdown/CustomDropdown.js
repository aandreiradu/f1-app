import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import useDropdown from '../../hooks/useDropdown';
import {
	CustomDropdownContainer,
	CustomDropdownIcon,
	CustomDropdownInput,
	CustomDropdownResultItem,
	CustomDropdownResults,
	CustomDropdownSearchWrapper
} from './CustomDropdown.styles';

const CustomDropdown = () => {
	const { value, onChangeHandler, onSelectedItem, onOpen, isOpen, query } = useDropdown();
	/*  
	// const [selectedValue, setSelectedValue] = useState({});
	// const [query, setQuery] = useState('');
	// const [isOpen, setIsOpen] = useState(false);

	// const handleQuerySearch = (e) => {
	// 	!isOpen && setIsOpen(true);
	// 	if (e.target.value !== selectedValue?.name) {
	// 		setSelectedValue({});
	// 	}
	// 	setQuery(e.target.value);
	// };

	// const handleOpenDropdownOpen = () => setIsOpen((prev) => !prev);

	// const handleTeamSelection = (e) => {
	// 	console.log('e', e);
	// 	setSelectedValue({
	// 		teamId: e?.id,
	// 		name: e?.name
	// 	});
	// 	setQuery(e?.name);
	// 	setIsOpen(false);
	// };
    */

	let dataSource = [
		{
			name: 'RedBull'
		},
		{
			name: 'Ferrari'
		},
		{
			name: 'Mercedes'
		},
		{
			name: 'RedBull'
		},
		{
			name: 'Ferrari'
		},
		{
			name: 'Mercedes'
		},
		{
			name: 'RedBull'
		},
		{
			name: 'Ferrari'
		},
		{
			name: 'Mercedes'
		}
	];

	const filteredTeams = !query
		? dataSource
		: dataSource?.filter((team) => team?.name?.toLowerCase()?.includes(query?.toLowerCase()));

	console.log('filteredTeams', filteredTeams);

	useEffect(() => {
		console.log('query', query);
		console.log('selectedValue', value);
	}, [query, value]);

	return (
		<CustomDropdownContainer>
			<CustomDropdownSearchWrapper>
				<CustomDropdownInput
					onClick={onOpen}
					onChange={onChangeHandler}
					name="teamSearch"
					spellCheck="false"
					type="text"
					placeholder="Search Team"
					value={query === value?.name ? value?.name : query}
				/>
				<CustomDropdownIcon icon={faSearch} />
			</CustomDropdownSearchWrapper>
			<CustomDropdownResults isOpen={isOpen} resultsNo={filteredTeams?.length}>
				{filteredTeams?.map((result, index) => (
					<CustomDropdownResultItem
						onClick={onSelectedItem.bind(this, { id: index, value: result?.name })}
						key={index}
					>
						{result?.name}
					</CustomDropdownResultItem>
				))}
			</CustomDropdownResults>
		</CustomDropdownContainer>
	);
};

export default CustomDropdown;
