import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LogIn from './pages/LogIn.jsx';
import DisplayWardrobe from './pages/DisplayWardrobe.jsx';
import UploadWardrobe from './pages/UploadWardrobe.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FashionSwiper from "./components/Swipper.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/login" element={<LogIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path='/display' element={<DisplayWardrobe/>}></Route>
        <Route path='/upload' element={<UploadWardrobe/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/swipe' element={<FashionSwiper/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;