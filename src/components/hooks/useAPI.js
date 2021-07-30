import { useReducer } from "react";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
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

  const post = (data) => {
    dispatch({ type: "init" });
    postData(url, data)
      .then((result) => dispatch({ type: "success", payload: result }))
      .catch((error) => dispatch({ type: "error", payload: error.message }));
  };

  return {
    loading: state.loading,
    result: state.result,
    post,
    error: state.error,
  };
}
export default useApi;
