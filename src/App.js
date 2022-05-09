
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Users from './components/User/Users';
import UserInfo from './components/User/UserInfo';
import Nav from './components/Nav/Nav';
import Card from './components/UI/Card';
import LastRaceResults from './pages/Results/LastRaceResults'
import LastQualyResults from './pages/Results/LastQualyResults'
import Schedule from './components/Results/Schedule';


function App() {
  return (
    <>
      <Card className="App">
        <Nav />
        <Routes>
          <Route path='/' element={<Users />}>
          </Route>
          <Route path='/:driverId' element={<UserInfo />}></Route>
          <Route path='/race-results/last' element={<LastRaceResults />}></Route>
          <Route path='/qualyfing-results/last' element={<LastQualyResults />}></Route>
          <Route path='/schedule/last' element={<Schedule />}></Route>
        </Routes>
      </Card>
      {/* <Footer /> */}
    </>
  );
}

export default App;
