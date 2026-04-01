import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './utils/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Quiz from './pages/Quiz';
import Info from './pages/Info';
import Profile from './pages/Profile';
import SetupQuiz from './pages/SetupQuiz';
import Results from './pages/Results'
import Login from './pages/Login';
import Register from './pages/Register';
import RedirectAuthenticated from './components/RedirectAuthenticated';
import MyProfile from './pages/MyProfile';
import ChangePassword from './pages/ChangePassword';
import { Navigate } from 'react-router';
import Routines from './pages/Routines';
import CreateRoutine from './pages/CreateRoutine';
import SearchRoutines from './pages/SearchRoutines';
import MyRoutines from './pages/MyRoutines';
import MyThings from './pages/MyThings';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        ),
        children: [
            {
                path: 'info', element: <Info></Info>
            },
            {
                path: 'quiz', element: <Quiz></Quiz>
            },
            {
                path: 'profile', element: <Profile></Profile>
            },
            {
                path: 'setupquiz', element: <SetupQuiz></SetupQuiz>
            },
            {
                path: 'results', element: <Results></Results>
            },
            {
                path: 'login', element: <Login></Login>
            },
            {
                path: 'register', element: <Register></Register>
            },
            {
                path: 'myprofile', element: <RedirectAuthenticated><MyProfile></MyProfile></RedirectAuthenticated>
            },
            {
                path: 'changepassword', element: <RedirectAuthenticated><ChangePassword></ChangePassword></RedirectAuthenticated>
            },
            {
                path: 'mythings', element: <RedirectAuthenticated><MyThings></MyThings></RedirectAuthenticated>
            },
            {
                path: 'routines', element: <Routines></Routines>
            },
            {
                path: 'createroutine', element: <RedirectAuthenticated><CreateRoutine></CreateRoutine></RedirectAuthenticated>
            },
            {
                path: 'searchroutines', element: <SearchRoutines></SearchRoutines>
            },
            {
                path: 'myroutines', element: <RedirectAuthenticated><MyRoutines></MyRoutines></RedirectAuthenticated>
            },
            {
                path: "*", element: <Navigate to="/" replace />
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
