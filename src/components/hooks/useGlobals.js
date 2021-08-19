import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const DEFAULT_GLOBALS_URL = "./globals/data.json";

function useGlobals() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const globals = useSelector((state) => state.globals);
  const { rooms, areas, saved } = globals;

  const setSaved = useCallback(
    (value) => {
      return dispatch({
        type: "UPDATE_SAVED",
        value,
      });
    },
    [dispatch]
  );

  const loadGlobals = useCallback(
    (url) => {
      setLoading(true);
      fetch(url || DEFAULT_GLOBALS_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
      })
        .then((data) => data.json())
        .then((data) => {
          setLoading(false);
          dispatch({
            type: "UPDATE_GLOBALS",
            value: data,
          });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    },
    [dispatch, setLoading]
  );

  return {
    loadGlobals,
    loading,
    rooms,
    areas,
    saved,
    setSaved,
  };
}

export default useGlobals;
