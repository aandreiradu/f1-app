import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './store/Auth/auth.selector';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Users from './components/User/Users';
import UserInfo from './components/User/UserInfo';
import Nav from './components/Nav/Nav';
import Card from './components/UI/Card';
import LastRaceResults from './pages/Results/LastRaceResults';
import Schedule from './components/Schedule/Schedule';
import CircuitSchedule from './components/Circuits/CircuitSchedule';
import RaceFinished from './pages/Results/RaceFinished';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Standings from './pages/Standings/Standings';
import Teams from './pages/Teams/Teams';
import Persist from './components/PersistLogin/PersistLogin';
import ErrorModal from './components/UI/ErrorModal';
import UserProfile from './components/UserProfile/UserProfile';
import UserProfileEdit from './components/UserProfileEdit/UserProfileEdit';
import AddDriver from './components/AddDriver/AddDriver';
import AddTeam from './components/AddTeam/AddTeam';
import Qualyfing from './components/Qualyfing/Qualyfing';

function App() {
	const [showModal, setShowModal] = useState(false);
	const { accessToken, isAuth } = useSelector(selectIsAuth);

	const confirmErrorModal = () => {
		setShowModal(false);
	};

	if (!isMobile) {
		console.log('IS NOT MOBILE ');
		return (
			<ErrorModal
				title="Ooops!"
				message={`Hei, looks like you're not using a mobile device. For the moment, this application is optimized only for mobile devices. 
        You can access the application from your current device by opening the device toolbar from any browser. Click the link below to learn how to open the device toolbar. Please reload the page after activating the device toolbar.`}
				onConfirm={confirmErrorModal}
				linkURL="https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome#toc1"
				linkText="Device Toolbar"
				hideCloseBtn="hide"
			/>
		);
	} else {
		return (
			<>
				{accessToken && isAuth && <Nav />}
				<Card className="App">
					<Routes>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/register" element={<Register />}></Route>

						<Route element={<Persist />}>
							<Route path="/" element={<Users />}></Route>
							<Route path="/:driverId" element={<UserInfo />}></Route>
							<Route path="/standings" element={<Standings />} />
							<Route path="/teams" element={<Teams />}></Route>
							<Route path="/race-results/last" element={<LastRaceResults />}></Route>
							<Route path="/race-results/:round/results" element={<RaceFinished />} />
							<Route path="/qualyfing-results" element={<Qualyfing />}></Route>
							<Route path="/schedule/last" element={<Schedule />}></Route>
							<Route path="/schedule/:round/:circuitId" element={<CircuitSchedule />} />
							<Route path="/profile/:username" element={<UserProfile />} />
							<Route path="/profile/edit/:username" element={<UserProfileEdit />} />
							<Route path="/profile/:username/insert/driver" element={<AddDriver />} />
							<Route path="/profile/:username/insert/team" element={<AddTeam />} />
						</Route>
					</Routes>
				</Card>
			</>
		);
	}
}

export default App;
