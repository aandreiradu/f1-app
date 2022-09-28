import monthNames from './months';

export const buildWeekend = (start, end) => {
	const fp1Day = start.getDate();
	const fp1Month = monthNames[start.getMonth()];
	const fp1Year = start.getFullYear();

	console.log('START GP ', fp1Day, fp1Month, fp1Year);

	const raceDay = end.getDate();
	const raceMonth = monthNames[end.getMonth()];
	const raceYear = end.getFullYear();

	console.log('FINISH GP ', raceDay, raceMonth, raceYear);

	return `${fp1Day} ${fp1Month} ${fp1Year} - ${raceDay} ${raceMonth} ${raceYear}`;
};

export const decideActivity = (eventActivity) => {
	console.log('decideActivity received', eventActivity);
	const dateNow = new Date();
	const { FP1, FP2, FP3, Qualy, Race } = eventActivity;

	const fp1Date = new Date(FP1) ?? null;
	const fp2Date = new Date(FP2) ?? null;
	const fp3Date = new Date(FP3) ?? null;
	const qualyDate = new Date(Qualy) ?? null;
	const raceDate = new Date(Race) ?? null;

	const result =
		dateNow <= fp1Date
			? { title: 'Practice 1', dateTime: new Date(fp1Date) }
			: dateNow > fp1Date && dateNow <= fp2Date
			? { title: 'Practice 2', dateTime: new Date(fp2Date) }
			: dateNow > fp2Date && dateNow <= fp3Date
			? { title: 'Practice 3', dateTime: new Date(fp3Date) }
			: dateNow > fp3Date && dateNow <= qualyDate
			? { title: 'Qualyfing', dateTime: new Date(qualyDate) }
			: dateNow > qualyDate && dateNow <= raceDate
			? { title: 'Race', dateTime: new Date(raceDate) }
			: null;

	// console.log('decideActivity result', result);
	return result;
};

export const buildUpcomingEventPerDays = (upcomingRace) => {
	console.log('upcomingRaceupcomingRaceupcomingRace', upcomingRace);
	const fp1Day = String(
		new Date(upcomingRace?.FirstPractice?.date).toLocaleString('en-us', { weekday: 'long' })
	);
	const fp1Time = String(
		new Date(
			`${upcomingRace?.FirstPractice?.date} ${upcomingRace?.FirstPractice?.time}`
		)?.toLocaleTimeString()
	);
	const fp2Day = new Date(upcomingRace?.SecondPractice?.date).toLocaleString('en-us', {
		weekday: 'long'
	});
	const fp2Time = String(
		new Date(
			`${upcomingRace?.SecondPractice?.date} ${upcomingRace?.SecondPractice?.time}`
		)?.toLocaleTimeString()
	);
	const fp3Day = new Date(upcomingRace?.ThirdPractice?.date).toLocaleString('en-us', {
		weekday: 'long'
	});
	const fp3Time = String(
		new Date(
			`${upcomingRace?.ThirdPractice?.date} ${upcomingRace?.ThirdPractice?.time}`
		)?.toLocaleTimeString()
	);
	const qualyDay = new Date(upcomingRace?.Qualifying?.date).toLocaleString('en-us', {
		weekday: 'long'
	});
	const qualyTime = String(
		new Date(
			`${upcomingRace?.Qualifying?.date} ${upcomingRace?.Qualifying?.time}`
		)?.toLocaleTimeString()
	);
	const raceDay = new Date(upcomingRace?.date).toLocaleString('en-us', { weekday: 'long' });
	const raceTime = String(
		new Date(`${upcomingRace?.date} ${upcomingRace?.time}`)?.toLocaleTimeString()
	);

	return {
		fp1Day,
		fp1Time,
		fp2Day,
		fp2Time,
		fp3Day,
		fp3Time,
		qualyDay,
		qualyTime,
		raceDay,
		raceTime
	};
};
