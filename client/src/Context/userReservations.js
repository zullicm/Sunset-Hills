import React, { useState } from "react";
const UserReservationsContext = React.createContext();


function UserReservationsProvider({ children }) {
  const [userReservations, setUserReservations] = useState([])

  return (
    <UserReservationsContext.Provider value={{userReservations, setUserReservations}}>
      {children}
    </UserReservationsContext.Provider>
  );
}

export { UserReservationsContext, UserReservationsProvider };