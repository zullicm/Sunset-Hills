import React, { useContext, useState } from "react";
import { CourseContext } from "../Context/course";
import { UserContext } from "../Context/user";
import { ReservationsContext } from "../Context/reservations";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Course(){
  const {course, setCourse} = useContext(CourseContext)
  const {user, setUser} = useContext(UserContext)
  const {reservations, setReservations} = useContext(ReservationsContext)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [playerNum, setPlayerNum] = useState(null)
  const [cost, setCost] = useState(0)
  console.log(cost)
  console.log(playerNum)
  function changeDate(data){
    setDate(JSON.stringify(data))
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

  function submitReservation(){
    const datetime = date.slice(1, 12)
    let timedate = parseInt(time.slice(0,2))
    if(timedate < 10 && time.slice(2) === "p.m."){
      // post request if time is later than 12pm
      fetch(`/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          golf: true,
          player_num: playerNum,
          cost: cost,
          time: `${datetime}${timedate + 12}:00:00.000Z`,
          course_id: course.id,
          instructor_id: 5,
          user_id: user.id
        })
      })
      .then(res => res.json())
      .then(data => setReservations([data, ...reservations]))
    }else{
      // post request if time is earlier than 1pm
      fetch(`/reservations`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          golf: true,
          player_num: playerNum,
          cost: cost,
          time: `${datetime}0${timedate}:00:00.000Z`,
          course_id: course.id,
          instructor_id: 5,
          user_id: user.id
        })
      })
      .then(res => res.json())
      .then(data => setReservations([data, ...reservations]))
    }
  }


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
          {date ? <p>{date.slice(1, 11)} @ {time ? time : "Pick a time"}</p> : <p>Pick a date and time...</p>}
          {playerNum ? <p>For {playerNum} Golfer{playerNum > 1 ? "s" : null}</p>: <p>Please pick a number of golfers</p>}
          <p>Cost: ${cost}</p>
        </div>
        <button className="reserve-button"onClick={submitReservation}>Make Reservation</button>
        </div>
        <div className="calender-container">
          <Calendar onChange={changeDate}/>
        </div>
      <br/>
    </div>
  )
}

export default Course