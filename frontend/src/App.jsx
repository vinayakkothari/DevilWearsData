import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LogIn from './pages/LogIn.jsx';
import DisplayWardrobe from './pages/DisplayWardrobe.jsx';
import UploadWardrobe from './pages/UploadWardrobe.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/log-in" element={<LogIn/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path='/wardrobe' element={<DisplayWardrobe/>}></Route>
        <Route path='/upload' element={<UploadWardrobe/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;