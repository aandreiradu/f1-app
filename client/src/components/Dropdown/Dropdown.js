import { useState } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import {
	Arrow,
	DropdownContainer,
	OpenDropdown,
	DropdownList,
	SearchInput,
	DropdownListItem
} from './Dropdown.styles';
import { useDispatch } from 'react-redux';

const Dropdown = ({ search, dataSource, onSelectedDriver, position, betsPosition }) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [selectedDriver, setSelectedDriver] = useState({});

	const handleOpenDropdown = () => setIsOpen((prev) => !prev);

	const handleSelectedDriver = (key, name, position, betsPosition) => {
		console.log('handleSelectedDriver received', { key, name, position, betsPosition });
		setSelectedDriver({ key, name, position, betsPosition });
		onSelectedDriver(key, name, position, betsPosition);
		setIsOpen(false);
	};

	const filteredDrivers =
		query === ''
			? dataSource
			: dataSource?.filter((driver) =>
					driver?.name?.toLowerCase().includes(query?.toLocaleLowerCase())
			  );

	useEffect(() => {
		console.log('selectedDriver', selectedDriver);
	}, [selectedDriver]);

	return (
		<DropdownContainer>
			<p
				style={{
					textAlign: 'center'
				}}
			>
				{position}
			</p>
			<OpenDropdown>
				<SearchInput
					placeholder="Search Driver"
					onChange={(e) => {
						setQuery(e.target.value);
						setIsOpen(true);
					}}
				/>
				<Arrow icon={isOpen ? faChevronUp : faChevronDown} onClick={handleOpenDropdown} />
			</OpenDropdown>
			{isOpen && (
				<DropdownList>
					{filteredDrivers?.map((driver) => (
						<DropdownListItem
							key={driver.key}
							onClick={() =>
								handleSelectedDriver(driver?.key, driver?.name, position, betsPosition)
							}
						>
							{driver.name}
						</DropdownListItem>
					))}
				</DropdownList>
			)}
		</DropdownContainer>
	);
};

export default Dropdown;
