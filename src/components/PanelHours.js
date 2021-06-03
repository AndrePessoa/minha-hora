import React, { useRef } from "react";
import { Link } from "react-router-dom";

import Help from "./Help.js";
import Checkbox from "./ui/Checkbox.js";

import useActions from "./hooks/useActions.js";
import useInputs from "./hooks/useInputs.js";
import usePanels from "./hooks/usePanel.js";

function PanelHours() {
  const ref = useRef();
  const { inputs } = useInputs();
  const { panels, nextPanel } = usePanels();
  const { changeWeekdays, changeDays, changeHours } = useActions();

  const setWeekdays = (day, value) => {
    const result = [...inputs.weekdays];
    result[day] = value;
    const days = result.filter((v) => v).length;

    changeWeekdays(result);
    changeDays(days);
  };

  const { hours, days, weekdays } = inputs;
  const status = panels.hours;

  return (
    <form
      onSubmit={nextPanel}
      className={["panel", status ? "panel-complete" : ""].join(" ")}
    >
      <h2>Quer trabalhar quais dias da semana?</h2>
      <div className="checkbox-group">
        <Checkbox
          value={weekdays[0]}
          onChange={(value) => setWeekdays(0, value)}
        >
          D
        </Checkbox>
        <Checkbox
          value={weekdays[1]}
          onChange={(value) => setWeekdays(1, value)}
        >
          S
        </Checkbox>
        <Checkbox
          value={weekdays[2]}
          onChange={(value) => setWeekdays(2, value)}
        >
          T
        </Checkbox>
        <Checkbox
          value={weekdays[3]}
          onChange={(value) => setWeekdays(3, value)}
        >
          Q
        </Checkbox>
        <Checkbox
          value={weekdays[4]}
          onChange={(value) => setWeekdays(4, value)}
        >
          Q
        </Checkbox>
        <Checkbox
          value={weekdays[5]}
          onChange={(value) => setWeekdays(5, value)}
        >
          S
        </Checkbox>
        <Checkbox
          value={weekdays[6]}
          onChange={(value) => setWeekdays(6, value)}
        >
          S
        </Checkbox>
      </div>
      <Help header="">
        <p>
          Quais dias você pretende se dedicar ao trabalho diretamente e
          indiretamente.
        </p>
      </Help>
      <h2>E quantas horas por dia?</h2>
      <input
        type="number"
        min="1"
        max="24"
        name="hours"
        value={hours}
        onChange={(event) => changeHours(event.target.value)}
      />
      <Help header="">
        <p>
          Quantas horas por dia você pretende disponibilizar, tanto na tarefa em
          si, como em tarefas relacionadas.
        </p>
      </Help>
      <div className="action-line">
        <Link
          className={["btn", status ? "" : "btn-disabled"].join(" ")}
          disabled={!status}
          to={status ? "/resources" : ""}
        >
          pronto!
        </Link>
      </div>
    </form>
  );
}

export default PanelHours;
