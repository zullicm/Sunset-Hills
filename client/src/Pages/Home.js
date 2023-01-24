import React, { useState, useEffect, useContext } from "react";
import { CourseContext } from "../Context/course";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/low CC.jpg"

function Home(){
  const [courses, setCourses] = useState([])
  const {course, setCourse} = useContext(CourseContext)
  const history = useNavigate()
  
  function toCoursePage(e){
    setCourse(e)
    history("/course")
  }

  useEffect(() => {
    fetch("/courses")
    .then(res => res.json())
    .then(data => setCourses(data))
  }, [])
  
  function toInstructorsPage(){
    history("/instructors")
  }

  console.log(courses)

  return(
    <div className="homepage">
      <img className="SH-Logo"src={Logo}/> 
      <div>
        Need some help on your golf game?
        <br/>
        Make a reservation with one of our clubhouse pros
        <br/>
        <br/>
        <button onClick={toInstructorsPage}>Instructors</button>
        <h4>Pick a course</h4>
      {courses.map(course => <div onClick={e => toCoursePage(course)} key={course.id} className="course-name"><h5>{course.name}</h5><img className="course-home-img" src={course.image}/></div>)}

      </div>
    </div>
  )
}

export default Home