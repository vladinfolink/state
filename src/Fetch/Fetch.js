import React, {
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

import axios from "axios";

import { skipKey, getUniqString } from "./util";

// dalea grele:
export const StateContext = createContext();

const initialState = { cache: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.uid]: action.payload,
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

export const useFetch = (props) => {
  const { endpoint, method, params, onlyData } = props;
  const [{ cache }, dispatch] = useRequest();

  const uid = getUniqString({ ...props });

  useEffect(() => {
    (async () => {
      const response = await axios[method](endpoint);

      dispatch({
        uid,
        type: "SET_REQUEST_DATA",
        payload: {
          ...(onlyData ? { data: response.data } : { response }),
        },
      });
    })();
  }, []);

  return cache[uid];
};
