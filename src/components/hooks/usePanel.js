import { useState } from "react";
import { useSelector } from "react-redux";

function usePanels() {
  const panels = useSelector((state) => state.panels);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setStep] = useState([
    { id: "salary" },
    { id: "hours" },
    { id: "resources" },
    { id: "result" },
    { id: "complete" },
  ]);

  const nextPanel = (event) => {
    event.preventDefault();
  };

  return {
    panels,
    nextPanel,
    currentStep,
    steps,
  };
}

export default usePanels;
