import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Reservation from './Pages/Reservation';
import Signup from './Pages/Signup'
import User from './Pages/User';
import NavBar from './Components/NavBar';

function App() {


  
  return (
    <div className="App">
      <NavBar />
      <div id='body-container'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/reservation" element={<Reservation />} />
          <Route exact path="/user" element={<User />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
 