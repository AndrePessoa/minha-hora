import React from "react";
import { Link } from "react-router-dom";

import CurrencyInput from "./ui/CurrencyInput";

import Help from "./Help.js";

import useInputs from "./hooks/useInputs.js";
import usePanels from "./hooks/usePanel.js";

function PanelResult() {
  const { inputs } = useInputs();
  const { panels, nextPanel } = usePanels();

  const result = inputs.perHour;
  const status = panels.result;

  return (
    <form
      onSubmit={nextPanel}
      className={["panel", status ? "panel-complete" : ""].join(" ")}
    >
      <h2>O custo da sua hora deve ser de</h2>
      <CurrencyInput name="salary" value={result} readOnly highlight />
      <Help header="">
        <p>Esse valor é calculado sobre um cenário estimado.</p>
        <p>
          A seguir, veremos melhores todos os valores empregados e conceitos.
        </p>
      </Help>
      <div className="action-line">
        <Link
          className={["btn", status ? "" : "btn-disabled"].join(" ")}
          disabled={!status}
          to={status ? "/complete" : ""}
        >
          como assim?
        </Link>
      </div>
    </form>
  );
}

export default PanelResult;
