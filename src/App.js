import './App.css';
import { Outlet, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Header from './components/Header';

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
      <Outlet></Outlet>
    </div>
  );
}

export default App;
