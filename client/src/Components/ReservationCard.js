import React, { useState } from "react";

function ReservationsCard({reserveation}){
const [time, setTime] = useState(parseInt(reserveation.time.slice(12, 14)))
const [date, setDate] = useState(reserveation.time.slice(0, 10))

  if(reserveation.golf === true){
    return(
      <div className="reserve-card-golf">
        <p><b><u>Reservation Type: GOLF</u></b></p>
        <p>Course: {reserveation.course.name}</p>
        <p>Number of Golfers: {reserveation.player_num}</p>
        <p>Date: {date}</p>
        <p>Tee Time: {time > 12 ? 12-time : time} {time >= 12? "p.m." : "a.m."}</p>
        <p>Payment: ${reserveation.cost}</p>
      </div>
    )
  }else{
    return(
      <div className="reserve-card-inst">
        <p><b><u>Reservation Type: INSTRUCTIONAL</u></b></p>
        <p>Instructor: {reserveation.instructor.name}</p>
        <p>Date: {date}</p>
        <p>Tee Time: {time > 12 ? 12-time : time} {time >= 12? "p.m." : "a.m."}</p>
        <p>Payment: ${reserveation.cost}</p>
      </div>
    )
  }
}

export default ReservationsCard