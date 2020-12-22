import React, { createContext, useContext, useReducer } from "react";

import axios from "axios";

import { skipKey, getUniqString } from "./util.ts";

// dalea grele:
export const StateContext = createContext();

const initialState = { store: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return {
        ...state,
        store: {
          ...state.store,
          [action.uid]: action.payload,
        },
      };

    default:
      return state;
  }
};

export const StateProvider = ({ children }) => (
  <StateContext.Provider
    value={{
      cache: useReducer(reducer, initialState),
      client: {}
    }}
  >
    {children}
  </StateContext.Provider>
);

export const useRequest = () => {
  const [{ store }, dispatch] = useContext(StateContext).cache;
  return { store, dispatch };
};

async function makeStore(props) {
  const { store, dispatch } = this;
  const { endpoint, method, params, onlyData } = props;
  const uid = getUniqString({ ...props });

  console.log({ store });

  if (store[uid]) return store[uid];
  const response = await axios[method](endpoint);

  dispatch({
    uid,
    type: "SET_REQUEST_DATA",
    payload: {
      ...(onlyData ? { data: response.data } : { response }),
    },
  });

  return onlyData ? { data: response.data } : { response };
}

export function useFetch() {
  const { store, dispatch } = useRequest();

  return {
    request: makeStore.bind({
      store,
      dispatch,
    }),
  };
}
