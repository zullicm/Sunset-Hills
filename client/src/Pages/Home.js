import React, { useState, useEffect } from "react";
import Logo from "../Images/low CC.jpg"

function Home(){
  const [courses, setCourses] = useState([])


  useEffect(() => {
    fetch("http://localhost:3000/courses")
    .then(res => res.json())
    .then(data => setCourses(data))
  }, [])

console.log(courses)

  return(
    <div className="homepage">
      <img className="SH-Logo"src={Logo}/> 
      <div>
        <h4>Pick a course</h4>
      {courses.map(course => <div className="course-name"><h5>{course.name}</h5><img className="course-home-img" src={course.image}/></div>)}
      </div>
    </div>
  )
}

export default Home