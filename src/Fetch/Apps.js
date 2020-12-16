import { StateProvider } from "./Fetch";
import { useFetch } from "./Fetch";

const ThemedButton = () => {
  const [{ theme }, dispatch] = useFetch();

  return (
    <button
      onClick={() =>
        dispatch({
          type: "SET_REQUEST_DATA",
          uid: 'asdkjnsakdfjsdf',
          data: {
            apiResponse: {
              data: 'adasdaslkdjasd'
            }
          }
        })
      }
    >
      Make me blue!
    </button>
  );
};

export const Apps = () => {
  return (
    <StateProvider>
      <ThemedButton />
    </StateProvider>
  );
};
