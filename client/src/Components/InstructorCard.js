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
    <div className="instructor-card">
      <img className="instructor-headshot z-depth-5" src={trainer.image_1} />
      <div className="instructor-info z-depth-5">
        <button onClick={toInstructorPage} className="inst-reserve">Make a Reservation</button>
        <h5><u>{trainer.name}</u></h5>
        <p>{trainer.about}</p>
      </div>
    </div>
  )
}

export default InstructorCard