import './App.css';
import Quiz from './pages/Quiz';
import Info from './pages/Info';
import Profile from './pages/Profile';
import SetupQuiz from './pages/SetupQuiz';
import Results from './pages/Results'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import RedirectAuthenticated from './components/RedirectAuthenticated';
import MyProfile from './pages/MyProfile';

function App() {
  const location = useLocation();
  const showOnlyOnHome = location.pathname === '/';
  return (
    <div className="App">
      {
        showOnlyOnHome &&
        <h1>Kihoot</h1>
      }
      <Header></Header>
      {
        showOnlyOnHome &&
        <Navbar></Navbar>
      }
      <Routes>
        <Route path='/info' element={<Info></Info>}></Route>
        <Route path='/quiz' element={<Quiz></Quiz>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/setupquiz' element={<SetupQuiz></SetupQuiz>}></Route>
        <Route path='/results' element={<Results></Results>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/myprofile' element={<RedirectAuthenticated><MyProfile></MyProfile></RedirectAuthenticated>}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
