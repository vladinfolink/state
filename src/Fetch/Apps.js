import { StateProvider, useFetch } from "./Fetch";
import { useEffect } from "react";
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

  const { res, cache } = useFetch();

  useEffect(() => {
    const asd = res({
      endpoint: "https://swapi.dev/api/people/3",
      method: "get",
      params: { id: 123 },
      onlyData: true,
    });
    console.log({ asd });
  }, []);

  console.log({ cache });

  return (
    <>
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
