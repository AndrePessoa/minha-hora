import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

const GoToIntro = () => {
  const history = useHistory();
  const isInIntro = useRouteMatch("/intro");

  return isInIntro ? (
    <Link className="about" onClick={history.goBack}>
      voltar ao projeto
    </Link>
  ) : (
    <Link className="about" to="/intro">
      + sobre o projeto
    </Link>
  );
};

export default GoToIntro;
