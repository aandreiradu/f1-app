
import {  useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './store/Auth/auth.selector';
import './App.css';
import { Routes, Route, Navigate, useNavigate,useLocation } from 'react-router-dom'
import Users from './components/User/Users';
import UserInfo from './components/User/UserInfo';
import Nav from './components/Nav/Nav';
import Card from './components/UI/Card';
import LastRaceResults from './pages/Results/LastRaceResults'
import LastQualyResults from './pages/Results/LastQualyResults'
import Schedule from './components/Results/Schedule/Schedule';
import Home from './pages/Home/Home';
import CircuitSchedule from './components/Circuits/CircuitSchedule';
import RaceFinished from './pages/Results/RaceFinished';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'
// import AuthContext from './store/auth-context';
import Standings from './pages/Standings/Standings';
import Teams from './pages/Teams/Teams';

function App() {
  const { accessToken,isAuth } = useSelector(selectIsAuth);
  const navigate = useNavigate();
  let location = useLocation();
  
  useEffect(() => {
    if(!(accessToken && isAuth)) {
      return navigate('/login');
    }
  },[accessToken,isAuth,navigate]);


  return (
    <>
      { (accessToken && isAuth) && <Nav />}
      <Card className="App">
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/' element={<Users />}></Route>
          <Route path='/:driverId' element={<UserInfo />}></Route>
          <Route path='/standings' element={<Standings />} />
          <Route path='/teams' element={<Teams/>}></Route>
          <Route path='/race-results/last' element={<LastRaceResults />}></Route>
          <Route path='/race-results/:round/results' element={<RaceFinished />} />
          <Route path='/qualyfing-results/last' element={<LastQualyResults />}></Route>
          <Route path='/schedule/last' element={<Schedule />}></Route>
          <Route path='/schedule/:round/:circuitId' element={<CircuitSchedule />} />
        </Routes>
      </Card>
      {/* <Footer /> */}
    </>
  );
}

export default App;
