import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginUser from './components/auth/LoginUser';
import CreateUser from './components/auth/CreateUser';
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword';
import UserProfile from './components/UserProfile';
import Home from './components/Home'
import ActivateAccount from './components/auth/ActivateAccount'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/auth/register" element={<CreateUser />} />
          <Route exact path="/auth/login" element={<LoginUser />} />
          <Route exact path="/user/profile" element={<UserProfile />} />
          <Route exact path="/auth/forgotPassword/" element={<ForgotPassword />} /> 
          <Route exact path="/auth/resetPassword" element={<ResetPassword />} />
          <Route exact path="/auth/activateAccount/:token" element={<ActivateAccount />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
