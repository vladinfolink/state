import { StateProvider } from "./Fetch";
import { useFetch } from "./Fetch";

const ThemedButton = () => {
  const [{ theme }, dispatch] = useFetch();
  return (
    <button
      style={{color: theme.primary}}
      onClick={() =>
        dispatch({
          type: "changeTheme",
          newTheme: { primary: "blue" },
        })
      }
    >
      Make me blue!
    </button>
  );
};

export const Apps = () => {
  const initialState = {
    theme: { primary: "green" },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "changeTheme":
        return {
          ...state,
          theme: action.newTheme,
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemedButton />
    </StateProvider>
  );
};
