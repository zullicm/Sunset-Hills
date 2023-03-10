import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Images/sunset.jpg"

function NavBar({ user }){

  return(
    <nav id="navbar">
      <div className="nav-wrapper light-green lighten-2">
        <NavLink className="left black-text logo" exact to="/"><img className="nav-logo"src={Logo}/> Sunset Hills</NavLink>
        {user ? <NavLink className="right black-text navuser" exact to="/userpage">{user.full_name}</NavLink> : <NavLink className="right black-text navuser" exact to="/login">Login</NavLink>  }
      </div>
    </nav>
  )
}
export default NavBar