import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Reservations from './Pages/Reservations';
import Signup from './Pages/Signup'
import User from './Pages/User';
import NavBar from './Components/NavBar';
import Course from './Pages/Course';
import Instructors from './Pages/Instructors';
import Instructor from './Pages/Instructor';
import { CourseProvider } from './Context/course';
import { InstructorProvider } from './Context/instructor';

function App() {

  return (
    <div className="App">
      <NavBar />
      <div id='body-container'>
        <CourseProvider>
          <InstructorProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/course" element={<Course />} />
          <Route exact path="/reservations" element={<Reservations />} />
          <Route exact path='/instructors' element={<Instructors/>} />
          <Route exact path='/instructor' element={<Instructor/>} />
        </Routes>
          </InstructorProvider>
        </CourseProvider>    
      </div>
    </div>
  );
}

export default App;
 