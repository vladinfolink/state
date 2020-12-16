import { StateProvider } from "./Fetch";
import { useFetch } from "./Fetch";

const ThemedButton = () => {
  const [{ theme }, dispatch] = useFetch();
  return (
    <button
      style={{ color: theme.primary }}
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
  return (
    <StateProvider>
      <ThemedButton />
    </StateProvider>
  );
};
