import { useEffect, useState, useCallback } from 'react';

const useDropdown = () => {
	const [isTouched, setIsTouched] = useState(false);
	const [selectedValue, setSelectedValue] = useState({
		teamId: null,
		name: null
	});
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const handleQuerySearch = useCallback(
		(e) => {
			!isOpen && setIsOpen(true);
			if (e.target.value !== selectedValue?.name) {
				setSelectedValue({});
			}
			setQuery(e.target.value);
		},
		[isOpen, selectedValue]
	);

	const handleOpenDropdownOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const handleTeamSelection = useCallback((e) => {
		console.log('@@@handleTeamSelection HOOK', e);
		setSelectedValue({
			teamId: e?.teamId,
			name: e?.value
		});
		setQuery(e?.value);
		setIsOpen(false);
	}, []);

	const inputBlurHandler = () => setIsTouched(true);

	useEffect(() => {
		console.log('@@@selectedValue hook', selectedValue);
	}, [selectedValue]);

	const hasError = !selectedValue?.teamId && isTouched;

	const reset = useCallback(() => {
		setSelectedValue({
			teamId: null,
			name: null
		});
		setIsOpen(false);
		setQuery('');
		setIsTouched(false);
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
		inputBlurHandler,
		reset
	};
};

export default useDropdown;
