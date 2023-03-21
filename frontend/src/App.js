// import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import AdminHomePage from './pages/AdminHomePage';
import AddUserPage from './pages/AddUserPage';
import EditUserPage from './pages/EditUserPage';
import AdminLoginPage from './pages/AdminLoginPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/' element={<ProfilePage/>}/>
          <Route path='/admin' element={<AdminHomePage/>}/>
          <Route path='/adduser' element={<AddUserPage/>}/>
          <Route path='/edituser' element={<EditUserPage/>}/>
          <Route path='/adminlogin' element={<AdminLoginPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
