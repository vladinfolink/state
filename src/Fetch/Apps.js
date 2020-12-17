import { StateProvider, useFetch } from "./Fetch";

const ThemedButton = () => {
  const [res, cache] = useFetch({
    endpoint: "https://swapi.dev/api/people/1",
    method: "get",
    params: { id: 123 },
    onlyData: true,
  })

  const [res1, cache1]= useFetch({
    endpoint: "https://swapi.dev/api/people/2",
    method: "get",
    params: { id: 123 },
    onlyData: true,
  })

  console.log({cache, cache1})

  return (
    <>
      {JSON.stringify(res)}
      <br />
      --------------------
      <br />
      {JSON.stringify(res1)}
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
