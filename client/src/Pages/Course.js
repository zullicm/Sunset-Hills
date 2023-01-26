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
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [playerNum, setPlayerNum] = useState(null)
  const [cost, setCost] = useState(0)
  const history = useNavigate()

  function changeDate(data){
    const newDate = data.toLocaleString()
    const noTime = newDate.slice(0,-12).replaceAll(',','')  
    setDate(noTime)
  }

  const times = ['7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.']
  const players = [1, 2, 3, 4]

  function setPlayers(e){
    setPlayerNum(parseInt(e.target.value))
    setCost(parseInt(e.target.value) * 40)
  }
  function setDateTime(e){
    setTime(e.target.value)
  }

  function saveReservation(data){
    setReservations([data, ...reservations])
    history("/userpage")
  }

  function submitReservation(){
    const timedate = parseInt(time.slice(0,2))
    if(timedate < 10 && time.slice(2) === "p.m."){
      // post request if time is later than 12pm
      fetch(`/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          golf: true,
          player_num: playerNum,
          cost: cost,
          time: `${date}${timedate + 12}`,
          course_id: course.id,
          instructor_id: 5,
          user_id: user.id
        })
      })
      .then(res => res.json())
      .then(data => saveReservation(data))
    }else{
      // post request if time is earlier than 1pm
      fetch(`/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          golf: true,
          player_num: playerNum,
          cost: cost,
          time: `${date}${timedate >= 10 ? timedate : `0${timedate}`}`,
          course_id: course.id,
          instructor_id: 5,
          user_id: user.id
        })
      })
      .then(res => res.json())
      .then(data => saveReservation(data))
    }
  }
  const currentDay = new Date()
  const endDateMoment = moment(currentDay)
  const endDate = endDateMoment.add(6, 'months')
  console.log(currentDay)
  console.log(endDate._d)


  return (
    <div className="course-page z-depth-5">
      <div className="course-info">
        <h1>{course.name}</h1>
        <h5>Difficulty: {course.difficulty}</h5>
        <p>{course.about}</p>
      </div>
      <img className="course-page-img z-depth-5" src={course.image} />
      <div className="reservation-form">
        <select className="browser-default dropdowns" onChange={(e) => setDateTime(e)}>
          <option value="none">Select a Time</option>
          {times.map(time => <option key={time} value={time}>{time}</option>)}
        </select>
        <br/>
        <select className="browser-default dropdowns" onChange={(e) => setPlayers(e)}>
          <option value="none">Select #of Players</option>
          {players.map(player => <option key={player} value={player}>{player}</option>)}
        </select>
        <br/>
        <div className="reserve-info">
          <p><b><u>Reservation Info:</u></b></p>
          {date ? <p>{date} @ {time ? time : "Pick a time"}</p> : <p>Pick a date and time...</p>}
          {playerNum ? <p>For {playerNum} Golfer{playerNum > 1 ? "s" : null}</p>: <p>Please pick a number of golfers</p>}
          <p>Cost: ${cost}</p>
        </div>
        <button className="reserve-button"onClick={submitReservation}>Make Reservation</button>
        </div>
        <div className="calender-container">
          <Calendar 
          maxDate={endDate._d}
          minDate={new Date()}
          calendarType="US"
          onChange={changeDate}/>
        </div>
      <br/>
    </div>
  )
}

export default Course