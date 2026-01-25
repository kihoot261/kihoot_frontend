import './App.css';
import Quiz from './pages/Quiz';
import Info from './pages/Info';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/info' element={<Info></Info>}></Route>
          <Route path='/quiz' element={<Quiz></Quiz>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
