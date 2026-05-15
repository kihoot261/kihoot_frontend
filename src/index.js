import ReactDOM from 'react-dom/client';
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
import MyProfile from './pages/User/MyProfile';
import ChangePassword from './pages/User/ChangePassword';
import { Navigate } from 'react-router';
import Routines from './pages/Routines/Routines';
import CreateRoutine from './pages/Routines/CreateRoutine';
import SearchRoutines from './pages/Routines/SearchRoutines';
import MyRoutines from './pages/Routines/MyRoutines';
import MyThings from './pages/User/MyThings';
import Routine from './pages/Routines/Routine';
import EditRoutine from './pages/Routines/EditRoutine';
import EditExercice from './pages/Exercises/EditExercice';
import AddSingleExercise from './pages/Exercises/AddSingleExercise';
import Info from './pages/Resources/Info';
import Techniques from './pages/Techniques/Techniques';
import CreateTechnique from './pages/Techniques/CreateTechnique';
import SearchTechnique from './pages/Techniques/SearchTechnique';
import Technique from './pages/Techniques/Technique';
import MyTechniques from './pages/Techniques/MyTechniques';
import Flashcards from './pages/Flashcards/Flashcards';
import SetupFlashcards from './pages/Flashcards/SetupFlashcards';
import CreateDiary from './pages/Diaries/CreateDiary';
import MyDiaries from './pages/Diaries/MyDiaries';
import Diaries from './pages/Diaries/Diaries';
import RedirectAuthenticated from './utils/RedirectAuthenticated';
import Diary from './pages/Diaries/Diary';
import DiaryEntry from './pages/Diaries/DiaryEntry';
import Events from './pages/Events/Events';
import CreateEvent from './pages/Events/CreateEvent';
import SearchEvents from './pages/Events/SearchEvents';
import MyEvents from './pages/Events/MyEvents';
import Event from './pages/Events/Event';

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
                path: 'techniques', element: <Techniques></Techniques>
            },
            {
                path: 'createtechnique', element: <RedirectAuthenticated><CreateTechnique></CreateTechnique></RedirectAuthenticated>
            },
            {
                path: 'searchtechniques', element: <SearchTechnique></SearchTechnique>
            },
            {
                path: 'technique', element: <Technique></Technique>
            },
            {
                path: 'mytechniques', element: <RedirectAuthenticated><MyTechniques></MyTechniques></RedirectAuthenticated>
            },
            {
                path: 'setupflashcards', element: <SetupFlashcards></SetupFlashcards>
            },
            {
                path: 'flashcards', element: <Flashcards></Flashcards>
            },
            {
                path: 'creatediary', element: <RedirectAuthenticated><CreateDiary></CreateDiary></RedirectAuthenticated>
            },
            {
                path: 'mydiaries', element: <RedirectAuthenticated><MyDiaries></MyDiaries></RedirectAuthenticated>
            },
            {
                path: 'diaries', element: <RedirectAuthenticated><Diaries></Diaries></RedirectAuthenticated>
            },
            {
                path: 'diary', element: <RedirectAuthenticated><Diary></Diary></RedirectAuthenticated>
            },
            {
                path: 'diaryentry', element: <RedirectAuthenticated><DiaryEntry></DiaryEntry></RedirectAuthenticated>
            },
            {
                path: 'events', element: <Events></Events>
            },
            {
                path: 'createevent', element: <RedirectAuthenticated><CreateEvent></CreateEvent></RedirectAuthenticated>
            },
            {
                path: 'searchevents', element: <SearchEvents></SearchEvents>
            },

            {
                path: 'myevents', element: <RedirectAuthenticated><MyEvents></MyEvents></RedirectAuthenticated>
            },
            {
                path: 'event', element: <Event></Event>
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
