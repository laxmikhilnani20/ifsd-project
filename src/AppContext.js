import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]); // Default to an empty array

  return (
    <AppContext.Provider value={{ reminders, setReminders }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using context
export const useAppContext = () => {
  return useContext(AppContext);
};
