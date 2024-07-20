import React, { useState,useEffect } from "react";
import './App.css';
import { auth } from "./utils/firebase";
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./components/profile";
import Login from "./components/login";
import SignUp from "./components/register";
import PhoneSignUp from "./components/phoneSignup";


function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/profile" /> : <Login />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/phonesignup" element={<PhoneSignUp />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </div>
  </Router>
);
}

 

export default App;
