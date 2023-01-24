import React, {useContext} from "react";
import { InstructorContext } from "../Context/instructor";

function Instructor(){
  const {instructor, setInstructor} = useContext(InstructorContext)

  return(
    <div className="white">
      {instructor.name}
    </div>
  )
}

export default Instructor