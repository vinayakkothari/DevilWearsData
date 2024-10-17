import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LogIn from './pages/LogIn.jsx';
import DisplayWardrobe from './pages/DisplayWardrobe.jsx';
import UploadWardrobe from './pages/UploadWardrobe.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FashionSwiper from "./pages/Swipe.jsx";
import Community from "./pages/Community.jsx";
import Messages from "./components/Chat.jsx";
import Challenges from "./pages/Challenges.jsx";
import MoodBoard from "./pages/MoodBoard.jsx";
import Profile from "./pages/Profile.jsx";
<<<<<<< HEAD
import Liked from "./pages/Liked.jsx";

=======
import ProtectedRoute from "./ProtectedRoute.jsx";
>>>>>>> 01795744329e8a097819ff2aed52c1cc2c95db2d

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/login" element={<LogIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>

        <Route element={<ProtectedRoute />}>
        <Route path='/display' element={<DisplayWardrobe/>}></Route>
        <Route path='/upload' element={<UploadWardrobe/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/swipe' element={<FashionSwiper/>}></Route>
        <Route path='/community' element={<Community/>}></Route>
        <Route path='/message' element={<Messages/>}></Route>
<<<<<<< HEAD
        <Route path='/liked' element={<Liked/>}></Route>

=======
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/moodboards" element={<MoodBoard/>}></Route>
        <Route path="/challenges" element={<Challenges/>}></Route>
        </Route>
>>>>>>> 01795744329e8a097819ff2aed52c1cc2c95db2d
      </Routes>
    </Router>
  );
}

export default App;