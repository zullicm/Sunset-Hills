import React, { useState } from "react";
const UserReservationsContext = React.createContext();


function UserReservationsProvider({ children }) {
  const [userReservations, setUserReservations] = useState(null)

  return (
    <UserReservationsContext.Provider value={{userReservations, setUserReservations}}>
      {children}
    </UserReservationsContext.Provider>
  );
}

export { UserReservationsContext, UserReservationsProvider };