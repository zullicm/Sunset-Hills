import React, { useState } from "react";
const InstructorContext = React.createContext();


function InstructorProvider({ children }) {
  const [instructor, setInstructor] = useState(null)
  return (
    <InstructorContext.Provider value={{instructor, setInstructor}}>
      {children}
    </InstructorContext.Provider>
  );
}

export { InstructorContext, InstructorProvider };