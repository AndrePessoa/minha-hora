import React from "react";
import { useLocation, Link } from "react-router-dom";

import usePanels from "./hooks/usePanel.js";

function Nav() {
  const location = useLocation();

  const { panels, steps } = usePanels();

  const currentPath = location.pathname.replace("/", "");
  const allComplete = Object.values(panels).indexOf(false) == -1;
  const allIncomplete = Object.values(panels).indexOf(true) == -1;

  const isEnd = currentPath === "end";

  return (
    <nav>
      <ul>
        {steps &&
          steps.map((step, i) => {
            const first = i === 0;
            const last = i === steps.length - 1;
            const active =
              currentPath === step.id || (currentPath === "" && first);
            const enabled = panels[step.id] || (last && allComplete);

            return (
              <li
                key={step.id.toString()}
                className={[
                  active ? "active" : "",
                  enabled ? "enabled" : "disabled",
                ].join(" ")}
              >
                <Link
                  data-index={step.id}
                  disabled={!panels[step.id]}
                  to={enabled ? "/" + step.id : ""}
                ></Link>
              </li>
            );
          })}
      </ul>
      {allComplete && (
        <ul>
          <li className={[isEnd ? "active" : "", "enabled"].join(" ")}>
            <Link data-index={"end"} to={"/end"}></Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
