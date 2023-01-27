import React, { useContext, useState } from "react";
import { CourseContext } from "../Context/course";
import { UserContext } from "../Context/user";
import { ReservationsContext } from "../Context/reservations";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { InstructorContext } from "../Context/instructor";
import { useNavigate } from "react-router-dom";
import moment from 'moment'

function Instructor(){
  const {course, setCourse} = useContext(CourseContext)
  const {instructor, setInstructor} = useContext(InstructorContext)
  const {user, setUser} = useContext(UserContext)
  const {reservations, setReservations} = useContext(ReservationsContext)

  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [ofDay, setOfDay] = useState("")
  const [error, setError] = useState(null)

  const history = useNavigate()

  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const todaysReservations = reservations.filter(reserve => reserve.time.slice(0,-2) === date)
    const todaysTimes = todaysReservations.map(reservation => parseInt(reservation.time.slice(-2)))
    const availableTimes = times.filter(time => !todaysTimes.includes(time))
  
  function changeDate(data){
    const newDate = data.toLocaleString()
    const noTime = newDate.slice(0,-12).replaceAll(',','')  
    setDate(noTime)
  }

  function toLogin(){
    history('/login')
  }

  function setDateTime(e){
    const timeNum = parseInt(e.target.value)
    setOfDay(timeNum >= 12 ? "p.m." : "a.m.")
    setTime(e.target.value)
  }
  
  function saveReservation(data){
    setReservations([data, ...reservations])
    history('/userpage')
  }

  function handleError(e){
    setError(e)
  }

  function submitReservation(){
    const timeInt = parseInt(time)
    const dateTime = date ? time ? `${date}${timeInt < 10 ? `0${timeInt}` : time}` : null : null 
      fetch(`/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          golf: false,
          player_num: 1,
          cost: instructor.price,
          time: dateTime,
          course_id: 4,
          instructor_id: instructor.id,
          user_id: user.id
        })
      })
      .then(res => {
        if(res.ok){
          res.json().then(data => saveReservation(data))
        }else{
          res.json().then(e => handleError(e))
        }
      }
    )
  }

  const currentDay = new Date()
  const endDateMoment = moment(currentDay)
  const endDate = endDateMoment.add(3, 'months')

  return (
    <div className="instructor-page z-depth-5">
      <div className="instructor-page-info">
        <h1>{instructor.name}</h1>
        <h5>Difficulty: {instructor.difficulty}</h5>
        <p>{instructor.about}</p>
        {error ? <p className="login-error"><b><i><u>{error.errors.map(error => <>{error}<br/></>)}</u></i></b></p>: null}
      </div>
        <div className="instructor-page-img z-depth-5">
          <img className="inst-image" src={instructor.image_2} />
        </div>
        <div className="calender-container">
          <Calendar 
          maxDate={endDate._d}
          minDate={new Date()}
          calendarType="US"
          onChange={changeDate}/>
        </div>
      <div className="reservation-inst-form">
      <select className="browser-default dropdowns" onChange={(e) => setDateTime(e)}>
        <option value="none">Select a Time</option>
          {availableTimes.map(time => <option key={time} value={time}>{time > 12 ? time - 12 : time} {time >= 12 ? "p.m." : "a.m."}</option>)}
        </select>
        <br/>
        <div className="reserve-info">
          <p><b><u>Reservation Info:</u></b></p>
          {date ? <p>{date} @ {time ? time : "Pick a time"}</p> : <p>Pick a date and time...</p>}
          <p>{instructor.name} Price Per Hour:</p>
          <p>${instructor.price}</p>
        </div>
        {user ? <button className="reserve-button"onClick={submitReservation}>Make Reservation</button> : <button className="reserve-button-login" onClick={toLogin}>Please Login To Make Reservations</button>}
        </div>
      <br/>
    </div>
  )
}

export default Instructor