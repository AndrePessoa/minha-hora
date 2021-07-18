import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Select from "react-select";
import Help from "./Help.js";

import useActions from "./hooks/useActions.js";
import useInputs from "./hooks/useInputs.js";
import usePanels from "./hooks/usePanel.js";
import useGlobals from "./hooks/useGlobals";

function PanelResources() {
  const ref = useRef();
  const { inputs } = useInputs();
  const { panels, nextPanel } = usePanels();
  const { changeArea, changePlace } = useActions();
  const { rooms, areas } = useGlobals();

  let { area, room } = inputs,
    areaObject = areas?.[area],
    roomObject = rooms?.[room],
    status = panels.resources;

  return (
    <form
      onSubmit={nextPanel}
      className={["panel", status ? "panel-complete" : ""].join(" ")}
    >
      <h2>qual a sua área de atuação?</h2>
      <Select
        name="area"
        value={areaObject}
        options={areas}
        onChange={(selected) => changeArea(selected ? selected.value : null)}
      />
      <Help header="">
        <p>
          Qual das opções mais se parece tecnicamente com o ramo de atividade
          que você exerce.
        </p>
      </Help>
      <h2>de que tipo de ambiente você precisa?</h2>
      <Select
        name="room"
        value={roomObject}
        options={rooms}
        onChange={(selected) => changePlace(selected ? selected.value : null)}
      />
      <Help header="">
        <p>Qual o espaço necessário para o seu trabalho.</p>
        <p>
          Esse espaço pode ser compartilhado ou estar inserido dentro de outros
          contextos.
        </p>
      </Help>
      <div className="action-line">
        <Link
          className={["btn", status ? "" : "btn-disabled"].join(" ")}
          disabled={!status}
          to={status ? "/result" : ""}
        >
          pronto!
        </Link>
      </div>
    </form>
  );
}

export default PanelResources;
