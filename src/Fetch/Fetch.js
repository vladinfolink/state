import React, { useEffect, createContext, useContext, useReducer } from "react";

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
  const [{ cache }, dispatch] = useContext(StateContext);
  return { cache, dispatch };
};

async function makeStore(props) {
  const { cache, dispatch } = this;
  const { endpoint, method, params, onlyData } = props;
  const uid = getUniqString({ ...props });

  if (cache[uid]) return;
  const response = await axios[method](endpoint);

  dispatch({
    uid,
    type: "SET_REQUEST_DATA",
    payload: {
      ...(onlyData ? { data: response.data } : { response }),
    },
  });

  return uid
}

export function useFetch() {
  const { cache, dispatch } = useRequest();

  return {
    res: makeStore.bind({
      cache,
      dispatch,
    }),
    cache,
  };
}
