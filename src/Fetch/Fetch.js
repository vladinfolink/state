import React, {useEffect, useState, createContext, useContext, useReducer } from "react";

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
  return useContext(StateContext);
};

export const useFetch = () => {
  const [state, setState] = useState({})
  const [{ cache }, dispatch] = useRequest();

  useEffect(() => {
    dispatch({
      type: "SET_REQUEST_DATA",
      uid: "asdkjnsakdfjsdf",
      data: {
        apiResponse: {
          data: "adasdaslkdjasd",
        },
      },
    });
  }, [])

  useEffect(() => {
    setState(cache)
  }, [cache])

  console.log({state})

  return {
    cache, dispatch, state: {...state}
  }
};
