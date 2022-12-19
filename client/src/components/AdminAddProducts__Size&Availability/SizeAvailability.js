import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {
	SizeAvailabilityContainer,
	SizeAvailabilityInnerContent,
	SizeAvailabilityInnerContentIcon,
	SizeAvailabilityConfirmBtn,
	SizeAvailabilityIsSaved
} from './SizeAvailability.styles';

const SizeAvailability = ({ children, canSubmit, activities, onSubmit }) => {
	const [isSaved, setIsSaved] = useState({
		saved: false,
		message: null
	});
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = (e) => {
		setIsOpen((prev) => !prev);
	};

	const confirmHandler = () => {
		if (!canSubmit) return;

		console.log('activities', activities);
		const hasEmptyActivities = activities?.find(
			(activity) => !activity?.size || !activity?.availability || !activity.size === 'SELECT SIZE'
		);

		console.log(' hasEmptyActivities', hasEmptyActivities);
		if (hasEmptyActivities) {
			setIsSaved({
				saved: false,
				message: 'Please complete all the activities or remove incomplete activities'
			});
			return;
		}

		setIsSaved(true);
		setIsSaved({
			saved: true,
			message: 'Size & Availability saved'
		});
		onSubmit.call(this, true);
		setTimeout(() => {
			setIsOpen(false);
		}, 2000);
	};

	return (
		<SizeAvailabilityContainer isOpen={isOpen} woBorder="true">
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
					<SizeAvailabilityIsSaved show={isSaved && canSubmit} isSaved={isSaved?.saved}>
						{isSaved?.message}
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
