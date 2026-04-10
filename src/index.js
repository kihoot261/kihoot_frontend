import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './utils/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Quiz from './pages/Quiz/Quiz';
import Profile from './pages/User/Profile';
import SetupQuiz from './pages/Quiz/SetupQuiz';
import Results from './pages/Quiz/Results'
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import RedirectAuthenticated from './components/RedirectAuthenticated';
import MyProfile from './pages/User/MyProfile';
import ChangePassword from './pages/User/ChangePassword';
import { Navigate } from 'react-router';
import Routines from './pages/Routines/Routines';
import CreateRoutine from './pages/Routines/CreateRoutine';
import SearchRoutines from './pages/Routines/CreateRoutine';
import MyRoutines from './pages/Routines/MyRoutines';
import MyThings from './pages/User/MyThings';
import Routine from './pages/Routines/Routine';
import EditRoutine from './pages/Routines/EditRoutine';
import EditExercice from './pages/Exercises/EditExercice';
import AddSingleExercise from './pages/Exercises/AddSingleExercise';
import Info from './pages/Resources/Info';

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
                path: 'routine', element: <Routine></Routine>
            },
            {
                path: 'editroutine', element: <RedirectAuthenticated><EditRoutine></EditRoutine></RedirectAuthenticated>
            },
            {
                path: 'editexercise', element: <RedirectAuthenticated><EditExercice></EditExercice></RedirectAuthenticated>
            },
            {
                path: 'addsingleexercise', element: <RedirectAuthenticated><AddSingleExercise></AddSingleExercise></RedirectAuthenticated>
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
