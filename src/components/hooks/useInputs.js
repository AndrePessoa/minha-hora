import { useSelector } from "react-redux";

function useInputs() {
  const inputs = useSelector((state) => state.inputs);

  return {
    inputs,
  };
}

export default useInputs;
