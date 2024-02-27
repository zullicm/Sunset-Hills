import React, { useState, useEffect, useContext } from "react";
import { CourseContext } from "../Context/course";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/low CC.jpg"
import Instructors from "./Instructors";

function NewHome(){
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

  function scroll(){
    const scrollLocation = document.getElementById("smooth-scroll-wrap")
    // scrollLocation[0].scrollIntoView({ behavior: 'smooth'})
    window.scrollTo({top: scrollLocation.getBoundingClientRect().top, left: 0, behavior: "smooth"})
    console.log(scrollLocation.getBoundingClientRect().top)
  }
  

  return(
    <div>
    <div className="homepage">
      <img className="SH-Logo"src={Logo}/> 
      <div>
        <div className="home-text">
          <button onClick={scroll}>Instructors</button>
        </div>
        <h4>Our Course's</h4>
        <br/>
          {courses.map(course => <div key={course.id} className="course"><img onClick={e => toCoursePage(course)} className="course-home-img" src={course.image}/><h2 className="course-name" onClick={e => toCoursePage(course)}>{course.name}</h2></div>)}
      </div>
    </div>
      <div id="smooth-scroll-wrap">
        <Instructors />
      </div>
    </div>
  )
}

export default NewHome
