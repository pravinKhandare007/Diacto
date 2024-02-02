// src/context/UserRoleContext.js
import React, { createContext, useContext, useState } from "react";

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  const updateUserRole = (role) => {
    setUserRole(role);
  };

  return (
    <UserRoleContext.Provider value={{ userRole, updateUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRoleContext = () => {
  return useContext(UserRoleContext);
};
