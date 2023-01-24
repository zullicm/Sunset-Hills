import React, { useContext, useState } from "react";
import { CourseContext } from "../Context/course";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Course(){
  const {course, setCourse} = useContext(CourseContext)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [playerNum, setPlayerNum] = useState(1)
  function changeDate(data){
    setDate(JSON.stringify(data))
  }

  const times = ['7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.']

  function setDateTime(e){
    setTime(e.target.value)

  }

    // t.string "type"
  // t.integer "player_num"
  // t.datetime "time"
  // t.bigint "course_id", null: false
  // t.bigint "instructor_id", null: false
  // t.bigint "user_id", null: false

  function submitReservation(){
    const datetime = date.slice(1, 12)
    let timedate = parseInt(time.slice(0,2))
    if(timedate < 10 && time.slice(2) === "p.m."){
      // post request if time is later than 12pm
      fetch(`http://localhost:3000/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          type: "Golf",
          player_num: playerNum,
          time: `${datetime}${timedate + 12}:00:00.000Z`,
          course_id: course.id,
          instructor_id: 1,
          user_id: 1
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }else{
      // post request if time is earlier than 1pm
      fetch(`http://localhost:3000/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          type: "Golf",
          player_num: playerNum,
          time: `${datetime}0${timedate}:00:00.000Z`,
          course_id: course.id,
          instructor_id: 0,
          user_id: 1
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  }

//   def reservation_params
//      params.permit(:type, :player_num, :time, :course_id, :instructor_id, :user_id)
//   end


  return (
    <div className="course-page">
      <div className="course-info">
        <h1>{course.name}</h1>
        <h5>{course.difficulty}</h5>
        <p>{course.about}</p>
      </div>
      <img className="course-page-img" src={course.image} />
      <div className="calender-container">
        <button onClick={submitReservation}>Make Reservation</button>
        <Calendar onChange={changeDate}/>
      {date ? <p>Tee Time Set For {date.slice(1, 11)} @ {time ? time : "Pick a time"}</p> : null}
      </div>
      <select className="time-picker browser-default" onChange={(e) => setDateTime(e)}>
      <option value="none">Select a Time</option>
        {times.map(time => <option key={time} value={time}>{time}</option>)}
      </select>
      <br/>
    </div>
  )
}

export default Course