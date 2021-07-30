import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

function usePanels() {
  const location = useLocation();
  const history = useHistory();
  const panels = useSelector((state) => state.panels);
  const [steps, setStep] = useState([
    { id: "salary" },
    { id: "hours" },
    { id: "resources" },
    { id: "result" },
    { id: "complete" },
  ]);
  const currentPath = location.pathname.replace("/", "");
  const step = steps.find((step) => currentPath === step.id);
  const isCurrentComplete = panels[step?.id];

  const nextPanel = (event) => {
    const currentPath = location.pathname.replace("/", "");
    const currId = steps.findIndex((step) => currentPath === step.id);
    const nextStep = steps[currId + 1];
    if (isCurrentComplete && nextStep) history.push(nextStep.id);

    event.preventDefault();
  };

  return {
    panels,
    nextPanel,
    steps,
    isCurrentComplete,
  };
}

export default usePanels;
