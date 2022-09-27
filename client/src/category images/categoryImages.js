import circuits from './circuits.jpg';
import qualyfing from './qualy.jpg';
import raceResults from './race-results.jpg';
// import schedule from '../assets/schedule images/schedule-black.png';
import schedule from './schedule.png';

const categoryImages = [
	{ id: 'raceResults', imgSrc: raceResults, title: 'Last Race Results', path: 'race-results/last' },
	{
		id: 'schedule',
		imgSrc: schedule,
		title: `${new Date().getFullYear()} Schedule`,
		path: 'schedule/last'
	},
	{
		id: 'qualyfing',
		imgSrc: qualyfing,
		title: '2022 Qualyfing Results',
		path: 'qualyfing-results/last'
	},
	{ id: 'circuits', imgSrc: circuits, title: '2022 Circuits', path: 'circuits/last' }
];

export default categoryImages;
