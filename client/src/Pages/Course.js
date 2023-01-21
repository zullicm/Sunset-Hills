import React, { useContext } from "react";
import { CourseContext } from "../Context/course";

function Course(){
  const {course, setCourse} = useContext(CourseContext)

  return (
    <div className="course-page">
      <div className="course-info">
        <h1>{course.name}</h1>
        <h5>{course.difficulty}</h5>
        <p>{course.about}</p>
      </div>
      <img className="course-page-img" src={course.image} />
    </div>
  )
}

export default Course