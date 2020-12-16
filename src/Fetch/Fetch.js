import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";

import { skipKey } from "./util";

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
            ...skipKey(action, ["uid"]),
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

export const useRequest = (props) => {
  return useContext(StateContext);
};

export const useFetch = (props) => {
  const [state, setState] = useState({});
  const [{ cache }, dispatch] = useRequest();

  useEffect(() => {
    dispatch(props);
  }, []);

  useEffect(() => {
    setState(cache);
  }, [cache]);

  return {
    cache,
    dispatch,
    state,
  };
};
