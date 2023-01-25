import React, { useEffect, useState } from "react";
const ReservationsContext = React.createContext();


function ReservationsProvider({ children }) {
  const [reservations, setReservations] = useState(null)

  useEffect(() =>{
    fetch('/reservations')
    .then(res => res.json())
    .then(data => setReservations(data))
  },[])


  return (
    <ReservationsContext.Provider value={{reservations, setReservations}}>
      {children}
    </ReservationsContext.Provider>
  );
}

export { ReservationsContext, ReservationsProvider };