import React, {useState, useEffect, useContext}from "react";
import { UserContext } from "../Context/user";
import { ReservationsContext } from "../Context/reservations";
import { useNavigate } from "react-router-dom";
import ReservationsCard from "../Components/ReservationCard";

function UserPage(){
  const {user, setUser} = useContext(UserContext)
  const {reservations, setReservations} = useContext(ReservationsContext)
  const history = useNavigate()

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

  const userReserves = reservations.filter(reserve => reserve.user.id === user.id)
  return(
    <div className="user-page">
      <div><h2>Welcome, {user.full_name}</h2></div>
      {userReserves.map(reserve => <ReservationsCard key={reserve.id} reserve={reserve} />)}
    </div>
  )
}


export default UserPage

