import React, { useContext, useState } from "react";
import { CourseContext } from "../Context/course";
import { UserContext } from "../Context/user";
import { ReservationsContext } from "../Context/reservations";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { InstructorContext } from "../Context/instructor";
import { useNavigate } from "react-router-dom";


function Instructor(){
  const {course, setCourse} = useContext(CourseContext)
  const {instructor, setInstructor} = useContext(InstructorContext)
  const {user, setUser} = useContext(UserContext)
  const {reservations, setReservations} = useContext(ReservationsContext)
  const history = useNavigate()
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  
  function changeDate(data){
    const newDate = data.toLocaleString()
    const noTime = newDate.slice(0,-12).replaceAll(',','')  
    setDate(noTime)
  }
  
  const times = ['8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.']

  function setDateTime(e){
    setTime(e.target.value)
  }
  
  function handleSubmit(data){
    setReservations([data, ...reservations])
    history('/userpage')
  }

  function submitReservation(){
    const datetime = date.slice(1, 12)
    let timedate = parseInt(time.slice(0,2))
    if(timedate < 10 && time.slice(2) === "p.m."){
      // post request if time is later than 12pm
      fetch(`/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          golf: false,
          player_num: 1,
          cost: instructor.price,
          time: `${datetime}${timedate + 12}`,
          course_id: 4,
          instructor_id: instructor.id,
          user_id: user.id
        })
      })
      .then(res => res.json())
      .then(data => handleSubmit(data))
    }else{
      // post request if time is earlier than 1pm
      fetch(`/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          golf: false,
          player_num: 1,
          cost: instructor.price,
          time: `${date}${timedate >= 10 ? timedate : `0${timedate}`}`,
          course_id: 4,
          instructor_id: instructor.id,
          user_id: user.id
        })
      })
      .then(res => res.json())
      .then(data => handleSubmit(data))
    }
  }


  return (
    <div className="instructor-page z-depth-5">
      <div className="instructor-page-info">
        <h1>{instructor.name}</h1>
        <h5>Difficulty: {instructor.difficulty}</h5>
        <p>{instructor.about}</p>
      </div>
        <div className="instructor-page-img z-depth-5">
          <img className="inst-image" src={instructor.image_2} />
        </div>
        <div className="calender-container">
          <Calendar onChange={changeDate}/>
        </div>
      <div className="reservation-inst-form">
        <select className="browser-default dropdowns" onChange={(e) => setDateTime(e)}>
          <option value="none">Select a Time</option>
          {times.map(time => <option key={time} value={time}>{time}</option>)}
        </select>
        <br/>
        <div className="reserve-info">
          <p><b><u>Reservation Info:</u></b></p>
          {date ? <p>{date} @ {time ? time : "Pick a time"}</p> : <p>Pick a date and time...</p>}
          <p>{instructor.name} Price Per Hour:</p>
          <p>${instructor.price}</p>
        </div>
        <button className="reserve-button"onClick={submitReservation}>Make Reservation</button>
        </div>
      <br/>
    </div>
  )
}

export default Instructor