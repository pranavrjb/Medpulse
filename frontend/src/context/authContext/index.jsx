// import React, { createContext, useContext, useState } from "react";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to wrap your app
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Define userLogin or any other functions that you want to make available in the context
//   const userLogin = (userData) => {
//     setUser(userData); // Update the user state with the provided data
//   };

//   const userLogout = () => {
//     setUser(null); // Clear the user state on logout
//   };

//   return (
//     <AuthContext.Provider value={{ user, userLogin, userLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
