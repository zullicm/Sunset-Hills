import React, { useState } from "react";
const CourseContext = React.createContext();


function CourseProvider({ children }) {
  const [course, setCourse] = useState(null)
  return (
    <CourseContext.Provider value={{course, setCourse}}>
      {children}
    </CourseContext.Provider>
  );
}

export { CourseContext, CourseProvider };