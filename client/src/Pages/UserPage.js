import React, {useState, useEffect, useContext}from "react";
import { UserContext } from "../Context/user";
import { ReservationsContext } from "../Context/reservations";
import { useNavigate } from "react-router-dom";

function UserPage(){
  const {user, setUser} = useContext(UserContext)
  const {reservations, setReservations} = useContext(ReservationsContext)
  const history = useNavigate()

  console.log(reservations)
  function handleLogout(){
    fetch("/logout",{
      method: "DELETE"
    }).then(res =>{
      if(res.ok){
        setUser(null)
      }
    })
    history("/login")
  }

  return(
    <div className="user-page">
      <h1>
        {user.full_name}
      </h1>
      <button onClick={handleLogout}> Sign Out</button>
    </div>
  )
}

export default UserPage

