import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../Context/course";
import { UserContext } from "../Context/user";
import { ReservationsContext } from "../Context/reservations";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

function Course(){
  const {course, setCourse} = useContext(CourseContext)
  const {user, setUser} = useContext(UserContext)
  const {reservations, setReservations} = useContext(ReservationsContext)
  const [error, setError] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [ofDay, setOfDay] = useState("")
  const [playerNum, setPlayerNum] = useState(null)
  const [cost, setCost] = useState(0)
  const history = useNavigate()
  const times = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  const thisCourseReservations = reservations.filter(reserve => reserve.course_id === course.id)
  const todaysReservations = thisCourseReservations.filter(reserve => reserve.time.slice(0,-2) === date)
  const todaysTimes = todaysReservations.map(reservation => parseInt(reservation.time.slice(-2)))
  const availableTimes = times.filter(time => !todaysTimes.includes(time))
  const players = [1, 2, 3, 4]

  function toLogin(){
    history('/login')
  }

  function setPlayers(e){
    setPlayerNum(parseInt(e.target.value))
    setCost(parseInt(e.target.value) * 40)
  }
  
  function changeDate(data){
    const newDate = data.toLocaleString()
    const noTime = newDate.slice(0,-12).replaceAll(',','')  
    setDate(noTime)
  }


  function setDateTime(e){
    const timeNum = parseInt(e.target.value)
    setOfDay(timeNum >= 12 ? "p.m." : "a.m.")
    setTime(e.target.value)
  }

  function saveReservation(data){
    setReservations([data, ...reservations])
    history("/userpage")
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
          golf: true,
          player_num: playerNum,
          cost: cost,
          time: dateTime,
          course_id: course.id,
          instructor_id: 5,
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
  const forNextMoment = moment(currentDay)
  const forMonthMoment = moment(currentDay)

  return (
    <div className="course-page z-depth-5">
      <div className="course-info">
        <h1>{course.name}</h1>
        <h5>Difficulty: {course.difficulty}</h5>
        <p>{course.about}</p>
        {error ? <p className="login-error"><b><i><u>{error.errors.map(error => <>{error}<br/></>)}</u></i></b></p>: null}
      </div>
      <img className="course-page-img z-depth-5" src={course.image} />
      <div className="reservation-form">
        <select className="browser-default dropdowns" onChange={(e) => setDateTime(e)}>
        <option value="" disabled selected hidden>Select a Time</option>
          {availableTimes.map(time => <option key={time} value={time}>{time > 12 ? time - 12 : time} {time >= 12 ? "p.m." : "a.m."}</option>)}
        </select>
        <br/>
        <select className="browser-default dropdowns" onChange={(e) => setPlayers(e)}>
          <option value="" disabled selected hidden>Select #of Players</option>
          {players.map(player => <option key={player} value={player}>{player}</option>)}
        </select>
        <br/>
        <div className="reserve-info">
          <p><b><u>Reservation Info:</u></b></p>
          {date ? <p>{date} @ {time ? `${time > 12 ? time - 12 : time} ${ofDay}` : "Pick a time"}</p> : <p>Pick a date and time...</p>}
          {playerNum ? <p>For {playerNum} Golfer{playerNum > 1 ? "s" : null}</p>: <p>Please pick a number of golfers</p>}
          <p>Cost: ${cost}</p>
        </div>
        {user ? <button className="reserve-button"onClick={submitReservation}>Make Reservation</button> : <button className="reserve-button-login" onClick={toLogin}>Please Login To Make Reservations</button>}
        </div>

        <div className="calendar-container">
          <Calendar 
          minDate={forNextMoment.add(1, 'd')._d}
          maxDate={forMonthMoment.add(3, 'months')._d}
          calendarType="US"
          onChange={changeDate}/>
        </div>
      <br/>
    </div>
  )
}

export default Course