import { StateProvider, useFetch } from "./Fetch";

const ThemedButton = () => {
  const { state } = useFetch({
    endpoint: "https://swapi.dev/api/people/2",
    method: "get",
    params: { id: 123 },
    onlyData: true,
  });

  console.log(state)

  return <>{JSON.stringify(state)}</>;
};

export const Apps = () => {
  return (
    <StateProvider>
      <ThemedButton />
    </StateProvider>
  );
};
