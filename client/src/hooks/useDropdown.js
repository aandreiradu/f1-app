import { useEffect, useState } from 'react';

const useDropdown = () => {
	const [isTouched, setIsTouched] = useState(false);
	const [selectedValue, setSelectedValue] = useState({
		teamId: null,
		name: null
	});
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const handleQuerySearch = (e) => {
		!isOpen && setIsOpen(true);
		if (e.target.value !== selectedValue?.name) {
			setSelectedValue({});
		}
		setQuery(e.target.value);
	};

	const handleOpenDropdownOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const handleTeamSelection = (e) => {
		console.log('@@@handleTeamSelection HOOK', e);
		setSelectedValue({
			teamId: e?.teamId,
			name: e?.value
		});
		setQuery(e?.value);
		setIsOpen(false);
	};

	const inputBlurHandler = () => setIsTouched(true);

	useEffect(() => {
		console.log('@@@selectedValue hook', selectedValue);
	}, [selectedValue]);

	console.log('@@@selectedValue', selectedValue);
	const hasError = !selectedValue?.teamId && isTouched;

	console.log('useDropdown will return', {
		selectedValue,
		isOpen,
		query,
		hasError,
		isTouched
	});

	return {
		value: selectedValue,
		onChangeHandler: handleQuerySearch,
		onSelectedItem: handleTeamSelection,
		onOpen: handleOpenDropdownOpen,
		isOpen,
		setIsOpen,
		query,
		hasError,
		isTouched,
		inputBlurHandler
	};
};

export default useDropdown;
