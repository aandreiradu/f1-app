import circuits from './circuits.jpg';
import qualyfing from './qualy.jpg';
import raceResults from './race-results.jpg';
// import schedule from '../assets/schedule images/schedule-black.png';
import schedule from './schedule.png';

const categoryImages = [
	{
		id: 'schedule',
		imgSrc: schedule,
		title: `${new Date().getFullYear()} Schedule`,
		path: 'schedule/last'
	},
	{ id: 'raceResults', imgSrc: raceResults, title: 'Last Race Results', path: 'race-results/last' },
	{
		id: 'qualyfing',
		imgSrc: qualyfing,
		title: '2022 Qualyfing Results',
		path: 'qualyfing-results'
	},
	{ id: 'circuits', imgSrc: circuits, title: '2022 Teams', path: 'teams' }
];

export default categoryImages;
