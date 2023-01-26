import React, { useState, useEffect } from "react";
import InstructorCard from "../Components/InstructorCard";

function Instructors(){
  const [instructors, setInstructors] = useState([])

  useEffect(() => {
    fetch("/instructors")
    .then(res => res.json())
    .then(data => setInstructorsFilter(data))
  }, [])

  function setInstructorsFilter(data){
    const trainers = data.filter(trainer => trainer.id !== 5)
    setInstructors(trainers)
  }

  return(
    <div className="instructors-page">
      {instructors.map(instructor => <InstructorCard key={instructor.id} trainer={instructor} />)}
    </div>
  )
}

export default Instructors