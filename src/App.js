
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Users from './components/User/Users';
import UserInfo from './components/User/UserInfo';
import Nav from './components/Nav/Nav';
import Card from './components/UI/Card';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Card className="App">
        <Nav />
        <Routes>
          <Route path='/' element={<Users />}>

          </Route>
          <Route path='/:driverId' element={<UserInfo />}></Route>
        </Routes>
      </Card>
      {/* <Footer /> */}
    </>
  );
}

export default App;
