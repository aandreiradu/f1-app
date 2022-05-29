
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
import { useContext, useEffect } from 'react';
import AuthContext from './store/auth-context';
import Standings from './pages/Standings/Standings';

function App() {
  const navigate = useNavigate();
  let location = useLocation();
  const {pathname} = location;
  const authCtx = useContext(AuthContext);
  const isAuth = authCtx.isLoggedIn;

  useEffect(() => {
    if (!isAuth && !pathname.includes('/register')) {
      console.log('is not auth')
      return navigate('/auth/login');
    }
  }, [isAuth, navigate]);

  return (
    <>
      {isAuth && <Nav />}
      <Card className="App">
        <Routes>
          <Route path='/auth/login' element={<Login />}></Route>
          <Route path='/auth/register' element={<Register />}></Route>
          <Route path='/' element={<Users />}></Route>
          <Route path='/:driverId' element={<UserInfo />}></Route>
          <Route path='/standings' element={<Standings />} />
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
