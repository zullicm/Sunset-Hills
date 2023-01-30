import React, { useState, useContext }from "react";
import { ReservationContext } from "../Context/reservation";
import { ReservationsContext } from "../Context/reservations";
import { useNavigate } from "react-router-dom";

function EditReservation(){
const {reservation, setReservation} = useContext(ReservationContext)
const {reservations, setReservations} = useContext(ReservationsContext)
const [time, setTime] = useState(parseInt(reservation.time.slice(-2)))
const [date, setDate] = useState(reservation.time.slice(0, -2))
const [course, setCourse] = useState(null)
const [golfers, setGolfers] = useState(null)
const history = useNavigate()
const players = [1,2,3,4]
const courses = ["GroundHog", "Snake", "Gator"]

function setNewCourse(e){
  setCourse(e.target.value)
}

function setNewGolfers(e){
  setGolfers(e.target.value)
}

function reservationDelete(data){
  const newReservations = reservations.filter(reservation => reservation.id !== data.id)
  setReservations(newReservations)
  console.log("DELETED")
  console.log(newReservations)
  history("/userpage")
}

function reservationEdit(data){
  const newReservations = reservations.filter(reservation => reservation.id !== data.id)
  setReservations([data, ...newReservations])
  console.log("EDITED")
  console.log([data, ...newReservations])
  history("/userpage")
}

function handleDelete(e){
  e.preventDefault()
  fetch(`/reservations/${reservation.id}`,{
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => reservationDelete(data))
}

function handleEdit(e){
  e.preventDefault()
  fetch(`/reservations/${reservation.id}`,{
    method: "PATCH",
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify({
      player_num: golfers,
      cost: golfers * 40,
      course_id: course,
    })
  })
  .then(res => res.json())
  .then((data) => reservationEdit(data))
}


console.log(time)


  if(reservation.golf === true){
    return(
      <div className="edit-reservation-page">
        <div className="edit-reservation">
        <p><b><u>Reservation Type: GOLF</u></b></p>
        <p>Tee Time: <i>{time > 12 ? time - 12 : time} {time >= 12? "p.m." : "a.m."}</i> Date: <i>{date}</i></p>
        <select className="browser-default edit-dropdowns" onChange={(e) => setNewCourse(e)}>
          <option value="none">Select Course</option>
          {courses.map(course => <option key={course} value={courses.indexOf(course) + 1}>{course}</option>)}
        </select>
        <br/>
        <select className="browser-default edit-dropdowns" onChange={(e) => setNewGolfers(e)}>
          <option value="none">Select #of Players</option>
          {players.map(player => <option key={player} value={player}>{player}</option>)}
        </select>
        <p>{course ? <b><u>NEW</u></b>: null} Course: <i>{course ? courses[course - 1] : reservation.course.name }</i></p>
        <p>{golfers ? <b><u>NEW</u></b>: null} Number of Golfers: <i>{golfers ? golfers :reservation.player_num}</i></p>
        <p>{golfers ? <b><u>NEW</u></b> : null} Payment: <i>${golfers ? golfers * 40 : reservation.cost}</i></p>
        <p className="star" ><i>*Tee Times, Dates, and Instructor reservations are <b>NOT</b> subject to change*<br/>*Please cancel reservation and create a new one <br/>if something must be changed*</i></p>
        <button className="edit" onClick={handleEdit}>Save New Reservation</button>
        <br/>
        <button className="delete" onClick={handleDelete}>Delete Reservation</button>
        </div>
      </div>
    )
  }else{
    return(
      <div className="edit-reservation-page">
        <div className="delete-inst" >
        <p><b><u>Reservation Type: INSTRUCTIONAL</u></b></p>
        <p>Instructor: <i>{reservation.instructor.name}</i></p>
        <p>Date: <i>{date}</i></p>
        <p>Tee Time: <i>{time > 12 ? 12-time : time} {time >= 12? "p.m." : "a.m."}</i></p>
        <p>Payment: <i>${reservation.cost}</i></p>
        <p className="star" ><i>*Tee Times, Dates, and Instructor reservations are <b>NOT</b> subject to change*<br/>*Please cancel reservation and create a new one <br/>if something must be changed*</i></p>
        <button className="delete" onClick={handleDelete}>Delete Reservation</button>
        </div>
      </div>
    )
  }
}
export default EditReservation