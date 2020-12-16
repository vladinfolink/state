import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

const initialState = {
  theme: { primary: "green" },
};

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_REQUEST_DATA":
        return {
          ...state,
          theme: action.newTheme,
        };

      default:
        return state;
    }
  };

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useFetch = () => useContext(StateContext);
