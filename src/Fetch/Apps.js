import { StateProvider, useFetch } from "./Fetch";

const ThemedButton = () => {
  const res = useFetch({
    endpoint: "https://swapi.dev/api/people/1",
    method: "get",
    params: { id: 123 },
    onlyData: true,
  })

  const res1 = useFetch({
    endpoint: "https://swapi.dev/api/people/2",
    method: "get",
    params: { id: 123 },
    onlyData: true,
  })

  // console.log(state)

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
