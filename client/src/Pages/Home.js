import React, { useState, useEffect } from "react";
import Logo from "../Images/sunset.jpg"

function Home(){
  const [courses, setCourses] = useState([])


  useEffect(() => {
    fetch("http://localhost:3000")
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])



  return(
    <div className="homepage">
      <h1>HomePage</h1>
      <img className="SH-Logo"src={Logo}/> 
    </div>
  )
}

export default Home