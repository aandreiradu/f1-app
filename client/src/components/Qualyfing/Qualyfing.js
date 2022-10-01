import React from 'react';
import {
	QualyfingHeader,
	QualyfingHeaderCompetition,
	QualyfingHeaderTitle,
	QualyfingWrapper,
	QualyfingResultsContainer
} from './Qualyfing.styles';
import QualyfingResult from './QualyfingResult';
import { useSelector } from 'react-redux';
import { selectEventsWithQualyFinished } from '../../store/Schedule/schedule.selector';

const Qualyfing = () => {
	const qualyEvents = useSelector(selectEventsWithQualyFinished);
	console.log('qualyEvents qualyfing component', qualyEvents);

	return (
		<QualyfingWrapper>
			<QualyfingHeader>
				<QualyfingHeaderTitle>F1 {new Date().getFullYear()} Qualyfing Results</QualyfingHeaderTitle>
				<QualyfingHeaderCompetition>FIA FORMULA ONE WORLD CHAMPIONSHIP™</QualyfingHeaderCompetition>
			</QualyfingHeader>

			{/* RESULTS */}
			<QualyfingResultsContainer>
				{qualyEvents?.map((event) => (
					<QualyfingResult
						key={event?.raceName}
						countryHost={event?.Circuit?.Location?.country || 'N/A'}
						grandPrixName={event?.raceName}
					></QualyfingResult>
				))}
			</QualyfingResultsContainer>
		</QualyfingWrapper>
	);
};

export default Qualyfing;