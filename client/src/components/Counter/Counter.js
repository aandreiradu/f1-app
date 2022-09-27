import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUpcomingEvent } from '../../store/Schedule/schedule.selector';
import {
	CounterContainer,
	CounterWrapper,
	CounterItemType,
	ConunterItemValue,
	CounterMainWrapper,
	CounterRolex,
	EventTitle
} from './Counter.style';
import LoaderIcon from '../LoaderReusable/LoaderIcon';
import { decideActivity } from '../../Utils/buildGPWeekend';

const updateCountdown = (eventStart) => {
	console.log('updateCountdown received', eventStart);
	let eventTime = new Date(eventStart);
	let currDate = new Date();
	if (!eventStart) {
		eventTime = new Date();
	}
	let timeLeft = eventTime?.getTime() - currDate?.getTime();

	let daysLeft = Math?.floor(timeLeft / (1000 * 60 * 60 * 24));
	let hoursLeft = Math?.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutesLeft = Math?.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	let secondsLeft = Math?.floor((timeLeft % (1000 * 60)) / 1000);

	if (daysLeft <= 0 && hoursLeft <= 0 && minutesLeft <= 0 && secondsLeft <= 0) {
		return {
			stop: true
		};
	}
	return {
		stop: false,
		daysLeft,
		hoursLeft,
		minutesLeft,
		secondsLeft
	};
};

const Counter = (props) => {
	let interval;
	const [isLoading, setIsLoading] = useState(true);
	const [storedIntervalId, setStoredIntervalId] = useState(0);
	const upcomingRace = useSelector(selectUpcomingEvent);
	const [timeUntilEvent, setTimeUntilEvent] = useState({});

	useEffect(() => {
		interval = timeUntilEvent?.eventTime ? 60000 : 1000;
		const intervalId = setInterval(() => {
			const { title, dateTime: eventTime } =
				decideActivity({
					FP1: `${upcomingRace?.FirstPractice?.date} ${upcomingRace?.FirstPractice?.time}`,
					FP2: `${upcomingRace?.SecondPractice?.date} ${upcomingRace?.SecondPractice?.time}`,
					FP3: `${upcomingRace?.ThirdPractice?.date} ${upcomingRace?.ThirdPractice?.time}`,
					Qualy: `${upcomingRace?.Qualifying?.date} ${upcomingRace?.Qualifying?.time}`,
					Race: `${upcomingRace?.date} ${upcomingRace?.time}`
				}) || {};

			const timeLeft = updateCountdown(eventTime);
			if (timeLeft?.stop === true) {
				clearInterval(intervalId);
				clearInterval(storedIntervalId);
				return;
			}
			setTimeUntilEvent({ title, eventTime: timeLeft });
			setStoredIntervalId(intervalId);
			setIsLoading(false);
		}, interval);

		return () => {
			clearInterval(intervalId);
			clearInterval(storedIntervalId);
		};
	}, [timeUntilEvent]);

	return (
		<CounterMainWrapper>
			{isLoading ? (
				<LoaderIcon />
			) : (
				<>
					<EventTitle>{timeUntilEvent?.title} STARTS IN </EventTitle>

					<CounterWrapper>
						<CounterContainer>
							<ConunterItemValue>{timeUntilEvent?.eventTime?.daysLeft || 0}</ConunterItemValue>
							<CounterItemType>Days</CounterItemType>
						</CounterContainer>
						<CounterContainer>
							<ConunterItemValue>{timeUntilEvent?.eventTime?.hoursLeft || 0}</ConunterItemValue>
							<CounterItemType>Hours</CounterItemType>
						</CounterContainer>
						<CounterContainer>
							<ConunterItemValue>{timeUntilEvent?.eventTime?.minutesLeft || 0}</ConunterItemValue>
							<CounterItemType>Minutes</CounterItemType>
						</CounterContainer>
					</CounterWrapper>
					<CounterRolex />
				</>
			)}
		</CounterMainWrapper>
	);
};

export default Counter;
