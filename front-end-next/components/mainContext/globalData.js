import { createContext, useEffect, useReducer } from "react";
import dataReducer from "./dataReducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  //instantiate the basic dispatcher and data, using a reducer I created

  const [data, dispatch] = useReducer(dataReducer, {
    myUser: null,
    animation: { state: 0 },
  });

  //this is the actual provider of the data this allows us to access the data quickly and
  // export what data from the context we actually want and need, so we don't need to export all the data cause something are context background
  const provider = {
    myUser: data.myUser,
    animation: data.animation,
    dispatch: dispatch,
  };

  //return the context with our data and reducer
  return (
    <DataContext.Provider value={provider}>{children}</DataContext.Provider>
  );
};
