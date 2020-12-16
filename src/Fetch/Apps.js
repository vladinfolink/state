import { StateProvider, useRequest, useFetch } from "./Fetch";

const ThemedButton = () => {
  const {cache, dispatch, state} = useFetch();

  return (
    <>
    {JSON.stringify(state)}
      <button
        onClick={() =>
          dispatch({
            type: "SET_REQUEST_DATA",
            uid: "asdkjnsakdfjsdf",
            data: {
              apiResponse: {
                data: "adasdaslkdjasd",
              },
            },
          })
        }
      >
        Make me blue!
      </button>
      {JSON.stringify(cache)}
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
