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
import NotFound from './pages/404/NotFound';
import ResetPassword from './pages/Auth/ResetPassword';
import NewPassword from './pages/Auth/NewPassword';
import Store from './pages/Shop/Shop';
import ShopByTeam from './components/Store/Store__ShopByTeam/ShopByTeam';
import Admin from './pages/Admin/Admin';
import AdminAddProducts from './pages/Admin/AdminAddProducts';
import ShopProductDeatils from './pages/Shop/Shop__ProductDetails/Shop__ProductDetails';

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
						{/* Signup & Signin routes */}
						<Route path="/login" element={<Login />}></Route>
						<Route path="/register" element={<Register />}></Route>

						{/* Reset & Update password routes */}
						<Route path="/reset/:token" element={<NewPassword />} />
						<Route path="/reset" element={<ResetPassword />} />

						<Route element={<Persist />}>
							<Route path="/" element={<Users />}></Route>

							<Route path="/driver/:driverId" element={<UserInfo />}></Route>

							<Route path="/standings" element={<Standings />} />

							<Route path="/teams" element={<Teams />}></Route>

							<Route path="/race-results">
								<Route index element={<LastRaceResults />} />
								<Route path="/race-results/last" element={<LastRaceResults />} />
								<Route path="/race-results/:round/results" element={<RaceFinished />} />
								{/* <Route path="/race-results/last" element={<LastRaceResults />}></Route> */}
								{/* <Route path="/race-results/:round/results" element={<RaceFinished />} /> */}
							</Route>

							<Route path="/qualyfing-results" element={<Qualyfing />}></Route>

							{/* 
								Schedule routes
								/schedule/last -> used to view the current year schedule
								/schedule/:round/:circuitId -> used to view a specific schedule
							*/}
							<Route path="/schedule/last" element={<Schedule />}></Route>
							<Route path="/schedule/:round/:circuitId" element={<CircuitSchedule />} />

							<Route path="/profile/:username" element={<UserProfile />} />
							<Route path="/profile/edit/:username" element={<UserProfileEdit />} />
							<Route path="/profile/:username/insert/driver" element={<AddDriver />} />
							<Route path="/profile/:username/insert/team" element={<AddTeam />} />

							{/* 
								Store Route 
								/shop -> used to show all teams products + shop by team
								/shop/team/:teamId => used to show all the products for a specific teamId
							
							*/}
							<Route path="/shop">
								<Route index element={<Store />} />
								<Route path="/shop/team/:teamId" element={<ShopByTeam />} />
								<Route path="/shop/product/:productId" element={<ShopProductDeatils />} />
							</Route>

							{/* Store - Shop By Team - Products filtered by team */}

							{/* Admin Routes */}
							{/* <Route path="/admin" element={<Admin />} /> */}
							{/* 
								/admin => page with all the options available for admin
								/admin/addProducts => used to add products to the store
								/admin/editProduct/:productId => edit products from store 
							*/}
							<Route path="/admin">
								<Route index element={<Admin />} />
								<Route path="/admin/addProducts" element={<AdminAddProducts />} />
							</Route>

							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</Card>
			</>
		);
	}
}

export default App;
