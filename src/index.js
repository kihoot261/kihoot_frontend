import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './auth/AuthContext';
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
