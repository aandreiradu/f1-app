import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	fetchScheduleSuccess,
	fetchScheduleFailure,
	fetchScheduleStart
} from '../../store/Schedule/schedule.actions';
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
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';
import ErrorModal from '../UI/ErrorModal';
import LoaderIcon from '../LoaderReusable/LoaderIcon';

const Qualyfing = () => {
	const [showModal, setShowModal] = useState(true);
	const dispatch = useDispatch();
	const { sendRequest, isLoading, error } = useAxiosInterceptorsPublic();
	const qualyEvents = useSelector(selectEventsWithQualyFinished);
	console.log('qualyEvents qualyfing component', qualyEvents);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		console.log('qualy events effect', qualyEvents);
		if (qualyEvents?.length === 0) {
			console.log('n-am programul => make request');
			dispatch(fetchScheduleStart());

			try {
				sendRequest(
					{
						url: 'https://ergast.com/api/f1/current.json',
						method: 'GET',
						withCredentials: false,
						signal: controller.signal
					},
					(scheduleResponse) => {
						console.log('scheduleResponse ', scheduleResponse);
						const currentSchedule = scheduleResponse?.MRData?.RaceTable?.Races;
						isMounted && dispatch(fetchScheduleSuccess(currentSchedule));
					}
				);
			} catch (error) {
				console.error('ERROR QUALYFING REQUEST', error);
				dispatch(
					fetchScheduleFailure(error?.message || error || 'Something went wrong! Try again later.')
				);
			}
		} else {
			console.log('am program in store => dont make request');
		}

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [sendRequest, dispatch]);

	const confirmHandler = () => setShowModal(false);

	return (
		<QualyfingWrapper>
			<QualyfingHeader>
				<QualyfingHeaderTitle>F1 {new Date().getFullYear()} Qualyfing Results</QualyfingHeaderTitle>
				<QualyfingHeaderCompetition>FIA FORMULA ONE WORLD CHAMPIONSHIP™</QualyfingHeaderCompetition>
			</QualyfingHeader>

			{/* ERROR MODAL */}
			{showModal && error && (
				<ErrorModal
					title="Ooops!"
					message={error?.message || error || 'Something went wrong! Try again later.'}
					onConfirm={confirmHandler}
				/>
			)}

			{/* LOADING COMPONENT */}
			{isLoading && <LoaderIcon text="Loading data, please wait ⏳" />}

			{/* RESULTS */}
			<QualyfingResultsContainer>
				{qualyEvents?.map((event) => (
					<QualyfingResult
						key={event?.raceName}
						countryHost={event?.Circuit?.Location?.country || 'N/A'}
						grandPrixName={event?.raceName}
						roundNo={event?.round}
						season={event?.season}
					></QualyfingResult>
				))}
			</QualyfingResultsContainer>
		</QualyfingWrapper>
	);
};

export default Qualyfing;
