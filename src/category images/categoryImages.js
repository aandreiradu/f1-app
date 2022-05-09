import circuits from './circuits.jpg'
import qualyfing from './qualy.jpg'
import raceResults from './race-results.jpg';
import schedule from '../assets/schedule images/schedule-black.png';


const categoryImages = [
    { id: 'raceResults', imgSrc: raceResults, title: 'Race', path: 'race-results/last' },
    { id: 'qualyfing', imgSrc: qualyfing, title: 'Qualyfing', path: 'qualyfing-results/last' },
    { id: 'circuits', imgSrc: circuits, title: 'Circuits', path: 'circuits/last' },
    { id: 'schedule', imgSrc: schedule, title: 'Schedule', path: 'schedule/last' },
];

export default categoryImages;