import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";

import axios from "axios";

import { skipKey, getUniqString } from "./util";

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
  const [state, setState] = useState({});
  const [{ cache }, dispatch] = useRequest();

  useEffect(() => {
    (async () => {
      const response = await axios[method](endpoint);
      console.log({ response });

      const uid = getUniqString({ ...props });
      console.log({ uid });

      dispatch({
        uid,
        type: "SET_REQUEST_DATA",
        payload: {
          ...(onlyData ? { data: response.data } : { response }),
        },
      });
    })();
  }, []);

  useEffect(() => {
    setState({ ...state, ...cache });
  }, [cache]);

  return {
    state,
  };
};
