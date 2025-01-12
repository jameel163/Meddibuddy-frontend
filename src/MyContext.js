import React, { createContext, useContext } from 'react';

// Create the context
const MyContext = createContext();

// Create a custom hook to use the context
export const useMyContext = () => useContext(MyContext);

// Create the provider component
export const MyProvider = ({ children, value }) => {
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyContext;
