import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {
	SizeAvailabilityContainer,
	SizeAvailabilityInnerContent,
	SizeAvailabilityInnerContentIcon,
	SizeAvailabilityConfirmBtn,
	SizeAvailabilityIsSaved
} from './SizeAvailability.styles';

const SizeAvailability = ({ children, canSubmit }) => {
	const [isSaved, setIsSaved] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = (e) => {
		setIsOpen((prev) => !prev);
	};

	const confirmHandler = () => {
		if (!canSubmit) return;

		setIsSaved(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsSaved(false);
		}, 2000);
	};

	return (
		<SizeAvailabilityContainer isOpen={isOpen}>
			<SizeAvailabilityInnerContent isOpen={isOpen} onClick={handleOpen}>
				<p>
					Size & Availability <span style={{ color: 'red' }}>*</span>
				</p>
				<SizeAvailabilityInnerContentIcon icon={isOpen ? faMinus : faPlus} />
			</SizeAvailabilityInnerContent>
			{isOpen && (
				<>
					{children}
					{/* {isSaved && canSubmit && ( */}
					<SizeAvailabilityIsSaved show={isSaved && canSubmit}>
						Size & Availability saved
					</SizeAvailabilityIsSaved>
					{/* )} */}
					<SizeAvailabilityConfirmBtn type="button" disabled={!canSubmit} onClick={confirmHandler}>
						Confirm
					</SizeAvailabilityConfirmBtn>
				</>
			)}
		</SizeAvailabilityContainer>
	);
};

export default SizeAvailability;
