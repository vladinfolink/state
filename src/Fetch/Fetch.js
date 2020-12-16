import React, { createContext, useContext, useReducer } from "react";

import { omit } from "./util";

export const StateContext = createContext();

const initialState = {
  cache: { randomUid: "green" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.uid]: {
            ...omit(action, ["uid"]),
          },
        },
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


export const useRequest = () => {
  return useContext(StateContext)
}