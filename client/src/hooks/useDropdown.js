import { useEffect, useState } from 'react';

const useDropdown = () => {
	const [selectedValue, setSelectedValue] = useState({});
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const handleQuerySearch = (e) => {
		!isOpen && setIsOpen(true);
		if (e.target.value !== selectedValue?.name) {
			setSelectedValue({});
		}
		setQuery(e.target.value);
	};

	const handleOpenDropdownOpen = () => setIsOpen((prev) => !prev);

	const handleTeamSelection = (e) => {
		console.log('@@@handleTeamSelection HOOK', e);
		setSelectedValue({
			teamId: e?.id,
			name: e?.value
		});
		setQuery(e?.value);
		setIsOpen(false);
	};

	useEffect(() => {
		console.log('@@@selectedValue hook', selectedValue);
	}, [selectedValue]);

	return {
		value: selectedValue,
		onChangeHandler: handleQuerySearch,
		onSelectedItem: handleTeamSelection,
		onOpen: handleOpenDropdownOpen,
		isOpen,
		query
	};
};

export default useDropdown;
