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
	const fp1Day = String(new Date(upcomingRace?.FirstPractice?.date).toString().split(' ')[0]);
	const fp1Time = String(
		new Date(
			`${upcomingRace?.FirstPractice?.date} ${upcomingRace?.FirstPractice?.time}`
		)?.toLocaleTimeString()
	);
	const fp2Day = String(new Date(upcomingRace?.SecondPractice?.date).toString().split(' ')[0]);
	const fp2Time = String(
		new Date(
			`${upcomingRace?.SecondPractice?.date} ${upcomingRace?.SecondPractice?.time}`
		)?.toLocaleTimeString()
	);
	const fp3Day = String(new Date(upcomingRace?.ThirdPractice?.date).toString().split(' ')[0]);
	const fp3Time = String(
		new Date(
			`${upcomingRace?.ThirdPractice?.date} ${upcomingRace?.ThirdPractice?.time}`
		)?.toLocaleTimeString()
	);
	const qualyDay = String(new Date(upcomingRace?.ThirdPractice?.date).toString().split(' ')[0]);
	const qualyTime = String(
		new Date(
			`${upcomingRace?.ThirdPractice?.date} ${upcomingRace?.ThirdPractice?.time}`
		)?.toLocaleTimeString()
	);
	const raceDay = String(new Date(upcomingRace?.date).toString().split(' ')[0]);
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
