import React, { useContext, useState } from "react";
import { CourseContext } from "../Context/course";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Course(){
  const {course, setCourse} = useContext(CourseContext)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  function changeDate(data){
    setDate(JSON.stringify(data))
  }

  const times = ['7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.']

  function setDateTime(e){
    setTime(e.target.value)
  }


  return (
    <div className="course-page">
      <div className="course-info">
        <h1>{course.name}</h1>
        <h5>{course.difficulty}</h5>
        <p>{course.about}</p>
      </div>
      <img className="course-page-img" src={course.image} />
      <div className="calender-container">
        <Calendar onChange={changeDate}/>
      {date ? <p>Tee Time Set For {date.slice(1, 11)} @ {time ? time : "Pick a time"}</p> : null}
      </div>
      <select className="time-picker browser-default" onChange={(e) => setDateTime(e)}>
      <option value="none">Select a Time</option>
        {times.map(time => <option value={time}>{time}</option>)}
      </select>
      <br/>
    </div>
  )
}

export default Course