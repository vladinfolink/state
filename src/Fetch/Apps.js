import { StateProvider, useFetch,  } from "./Fetch";
import { useEffect, useContext } from "react";

import {StateContext} from './Fetch'

const ThemedButton = () => {
  // const [res, cache] = useFetch({
  //   endpoint: "https://swapi.dev/api/people/1",
  //   method: "get",
  //   params: { id: 123 },
  //   onlyData: true,
  // })()

  // const [res1, cache1]= useFetch({
  //   endpoint: "https://swapi.dev/api/people/2",
  //   method: "get",
  //   params: { id: 123 },
  //   onlyData: true,
  // })()

  const { request } = useFetch();
  const {cache} = useContext(StateContext)

  useEffect(() => {
    const asd = request({
      endpoint: "https://swapi.dev/api/people/3",
      method: "get",
      params: { id: 123 },
      onlyData: true,
    }).then((resp) => {
      console.log({ resp });
    });
  }, []);

  const makeReq = () => {
    request({
      endpoint: "https://swapi.dev/api/people/1",
      method: "get",
      params: { id: 123 },
      onlyData: true,
    }).then((resp) => {
      console.log({ resp });
    });
  }

  console.log({cache})

  return (
    <>
    <button
      onClick={
        () => {
          //,,,
          return makeReq()
        }
      }
    >GET</button>
      <br />
      --------------------
      <br />
    </>
  );
};

export const Apps = () => {
  return (
    <StateProvider>
      <ThemedButton />
    </StateProvider>
  );
};
