import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { InstructorContext } from "../Context/instructor";


function InstructorCard({ trainer }){
  const history = useNavigate()
  const {instructor, setInstructor} = useContext(InstructorContext)

  function toInstructorPage(){
    setInstructor(trainer)
    history('/instructor')
  }

  return(
    <div onClick={toInstructorPage} className="headshot-container">
      <img className="instructor-headshot" src={trainer.image_1} />
      <div className="instructor-name">{trainer.name}</div>
    </div>
  )
}

export default InstructorCard