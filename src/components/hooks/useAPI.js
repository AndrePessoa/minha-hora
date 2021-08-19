import { useCallback, useReducer } from "react";

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

async function postData(url = "", data = {}) {
  const session = getCookie("PHPSESSID");

  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

const initialState = {
  loading: false,
  result: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...state, loading: true, result: "", error: "" };
    case "success":
      return {
        ...state,
        loading: false,
        result: action.payload || true,
        error: "",
      };
    case "error":
      return { ...state, loading: false, result: "", error: action.payload };
    default:
      throw new Error();
  }
}

function useApi(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const post = useCallback(
    (data) => {
      dispatch({ type: "init" });
      return postData(url, data)
        .then((result) => dispatch({ type: "success", payload: result }))
        .catch((error) => dispatch({ type: "error", payload: error.message }));
    },
    [dispatch]
  );

  return {
    loading: state.loading,
    result: state.result,
    post,
    error: state.error,
  };
}
export default useApi;
