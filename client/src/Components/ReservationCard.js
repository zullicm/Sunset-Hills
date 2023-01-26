import React, { useState, useContext } from "react";
import { ReservationContext } from "../Context/reservation";
import { useNavigate } from "react-router-dom";

function ReservationsCard({reserve}){
const [time, setTime] = useState(parseInt(reserve.time.slice(-2)))
const [date, setDate] = useState(reserve.time.slice(0, -2))
const {reservation, setReservation} = useContext(ReservationContext)
const history = useNavigate()

function editDelete(){
  setReservation(reserve)
  history("/editreservation")
}

  if(reserve.golf === true){
    return(
      <div className="reserve-card-golf">
        <p><b><u>Reservation Type: GOLF</u></b></p>
        <p>Course: <i>{reserve.course.name}</i></p>
        <p>Number of Golfers: <i>{reserve.player_num}</i></p>
        <p>Date: <i>{date}</i></p>
        <p>Tee Time: <i>{time > 12 ? time - 12 : time} {time >= 12? "p.m." : "a.m."}</i></p>
        <p>Payment: <i>${reserve.cost}</i></p>
        <button onClick={editDelete} className="edit-delete" >Edit/Delete</button>
      </div>
    )
  }else{
    return(
      <div className="reserve-card-inst">
        <p><b><u>Reservation Type: INSTRUCTIONAL</u></b></p>
        <p>Instructor: <i>{reserve.instructor.name}</i></p>
        <p>Date: <i>{date}</i></p>
        <p>Tee Time: <i>{time > 12 ? 12-time : time} {time >= 12? "p.m." : "a.m."}</i></p>
        <p>Payment: <i>${reserve.cost}</i></p>
        <button onClick={editDelete} className="edit-delete" >Delete</button>
      </div>
    )
  }
}

export default ReservationsCard