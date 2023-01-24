import React, { useState, useEffect } from "react";
import InstructorCard from "../Components/InstructorCard";

function Instructors(){
  const [instructors, setInstructors] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/instructors")
    .then(res => res.json())
    .then(data => setInstructors(data))
  }, [])

console.log(instructors)

  return(
    <div className="instructors-page">
      {instructors.map(instructor => <InstructorCard key={instructor.id} trainer={instructor} />)}
    </div>
  )
}

export default Instructors