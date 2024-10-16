import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LogIn from './pages/LogIn.jsx';
import DisplayWardrobe from './pages/DisplayWardrobe.jsx';
import UploadWardrobe from './pages/UploadWardrobe.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FashionSwiper from "./components/Swipper.jsx";
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/login" element={<LogIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>

        <Route element={<ProtectedRoute />}>
        <Route path="/swipe" element={<FashionSwiper />} />
        <Route path="/display" element={<DisplayWardrobe />} />
          <Route path="/upload" element={<UploadWardrobe />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;