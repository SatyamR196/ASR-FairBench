import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState(null);

  return (
    <DataContext.Provider value={{ baseUrl, setBaseUrl }}>
      {children}
    </DataContext.Provider>
  );
};
