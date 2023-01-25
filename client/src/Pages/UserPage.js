import React, {useState, useEffect, useContext}from "react";
import { UserContext } from "../Context/user";
import { useNavigate } from "react-router-dom";

function UserPage(){
  const {user, setUser} = useContext(UserContext)
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


//  function logoutUser(){
//      fetch("/logout", 
//      { method: "DELETE" 
//    }).then((r) => {
//        if (r.ok) {
//          setCurrentUser(null) <----- set current user back to null
//        }
//      });
//      pushLogin() <---- use Nav to push back to login page
//    }