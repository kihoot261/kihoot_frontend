import './App.css';
import Quiz from './pages/Quiz';
import Info from './pages/Info';
import Profile from './pages/Profile';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const showOnlyOnHome = location.pathname === '/';
  return (
    <div className="App">

      {
        showOnlyOnHome &&
        <>
          <Navbar></Navbar>
          <h1>Kihoot</h1>
        </>
      }
      <Routes>
        <Route path='/info' element={<Info></Info>}></Route>
        <Route path='/quiz' element={<Quiz></Quiz>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </div>
  );
}

export default App;
