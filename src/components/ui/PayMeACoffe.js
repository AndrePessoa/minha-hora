import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

const PayMeACoffe = () => {
  const history = useHistory();

  return (
    <Link
      className="coffee"
      to={{ pathname: "https://mepagaumcafe.com.br/andrepessoa/" }}
      target="_blank"
    >
      me paga um café? = )
    </Link>
  );
};

export default PayMeACoffe;
