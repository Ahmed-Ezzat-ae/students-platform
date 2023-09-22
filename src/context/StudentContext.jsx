import React, { createContext } from 'react';

export const StudentContext = createContext();
const StudentContextProvider = ({ children }) => {
  const studentData = JSON.parse(localStorage.getItem('studentData'));
  return (
    <StudentContext.Provider value={{ studentData }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
