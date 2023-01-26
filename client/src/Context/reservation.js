import React, { useState } from "react";
const ReservationContext = React.createContext();


function ReservationProvider({ children }) {
  const [reservation, setReservation] = useState([])

  return (
    <ReservationContext.Provider value={{reservation, setReservation}}>
      {children}
    </ReservationContext.Provider>
  );
}

export { ReservationContext, ReservationProvider };