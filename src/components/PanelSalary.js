import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Help from "./Help.js";
import useActions from "./hooks/useActions.js";
import useInputs from "./hooks/useInputs.js";
import usePanels from "./hooks/usePanel.js";
import CurrencyInput from "./ui/CurrencyInput.js";

function PanelSalary() {
  const ref = useRef();
  const { inputs } = useInputs();
  const { panels, nextPanel } = usePanels();
  const { changeSalary, doReset } = useActions();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const salary = inputs.salary;
  const status = panels["salary"];

  return (
    <form
      onSubmit={nextPanel}
      className={["panel", status ? "panel-complete" : ""].join(" ")}
    >
      <h2>Quanto você quer ganhar por mês?</h2>
      <CurrencyInput
        ref={ref}
        value={salary}
        onChange={(value) => changeSalary(value)}
      />
      <Help header="">
        <p>
          Quanto você quer ganhar mensalmente como salário líquido, já
          descontados todos os custos e impostos.
        </p>
        <p>Imagine que você é um funcionário de si mesmo.</p>
      </Help>
      <div className="action-line">
        <Link
          className={["btn", status ? "" : "btn-disabled"].join(" ")}
          disabled={!status}
          to={status ? "/hours" : ""}
        >
          pronto!
        </Link>
        {!!inputs.perHour && (
          <span
            className={["btn"].join(" ")}
            disabled={!status}
            to={status ? "/hours" : ""}
            onClick={() => doReset()}
          >
            recomeçar
          </span>
        )}
      </div>
    </form>
  );
}

export default PanelSalary;
