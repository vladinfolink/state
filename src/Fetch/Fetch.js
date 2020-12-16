import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";

import axios from "axios";

import { skipKey, genUniqStrFromKeys } from "./util";

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

export const useRequest = () => {
  return useContext(StateContext);
};

export const useFetch = ({ endpoint, method, params, onlyData }) => {
  const [state, setState] = useState({});
  const [{ cache }, dispatch] = useRequest();

  useEffect(() => {
    (async () => {
      const response = await axios.get(endpoint);
      console.log({ response });

      dispatch({
        type: "SET_REQUEST_DATA",
        uid: `${"asdasdasdasdasdasd"}`,
        ...(onlyData ? { data: response.data } : { response }),
      });
    })();
  }, []);

  useEffect(() => {
    setState(cache);
  }, [cache]);

  return {
    state,
  };
};
