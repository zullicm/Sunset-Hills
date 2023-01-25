import React, { useState, useEffect, useContext } from "react";
import { CourseContext } from "../Context/course";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/low CC.jpg"

function Home(){
  const [courses, setCourses] = useState([])
  const {course, setCourse} = useContext(CourseContext)
  const history = useNavigate()
  
  useEffect(() => {
    fetch("/courses")
    .then(res => res.json())
    .then(data => setCoursesFilter(data))
  }, [])

  function toCoursePage(e){
    setCourse(e)
    history("/course")
  }
  function setCoursesFilter(data){
    const courses = data.filter(course => course.id !== 4)
    setCourses(courses)
  }

  function toInstructorsPage(){
    history("/instructors")
  }

  return(
    <div className="homepage">
      <img className="SH-Logo"src={Logo}/> 
      <div>
        <div className="home-text">
          <p><b><i>Need help with your golf game???</i></b> <br/>Make a reservation with one of our <b>decorated</b> <u>Instructors!</u></p>
          <button onClick={toInstructorsPage}>Instructors</button>
        </div>
        <h4>Our Course's</h4>
      {courses.map(course => <div key={course.id} className="course-name"><h5>{course.name}</h5><img onClick={e => toCoursePage(course)} className="course-home-img" src={course.image}/></div>)}
      </div>
    </div>
  )
}

export default Home