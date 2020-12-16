import { StateProvider, useRequest, useFetch } from "./Fetch";

const ThemedButton = () => {
  const req = {
    type: "SET_REQUEST_DATA",
    uid: "asdkjnsakdfjsdf",
    data: {
      apiResponse: {
        data: "adasdaslkdjasd",
      },
    },
  };

  const { cache, dispatch, state } = useFetch(req);

  return <>{JSON.stringify(state)}</>;
};

export const Apps = () => {
  return (
    <StateProvider>
      <ThemedButton />
    </StateProvider>
  );
};
