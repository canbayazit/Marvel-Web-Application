import React, { createContext, useContext, useState } from "react";

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = (props) => {
  const [characterItem, setCharacterItem] = useState([]);

  return (
    <DataContext.Provider
      value={{
        characterItem,
        setCharacterItem,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
