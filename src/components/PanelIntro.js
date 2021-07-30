import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import usePanels from "./hooks/usePanel.js";

function PanelIntro() {
  const history = useHistory();
  const [closed, setClosed] = useState(true);
  const [email, setEmail] = useState();

  const { nextPanel } = usePanels();

  const send = () => {
    console.log(email);
  };

  const status = true;

  return (
    <form
      onSubmit={nextPanel}
      className={["panel big negative", status ? "panel-complete" : ""].join(
        " "
      )}
    >
      <p>Olá!</p>
      <p>
        Esse projeto foi desenvolvido por mim,{" "}
        <a href="http://www.apessoa.com">André Pessoa</a>, para auxiliar alguns
        amigos <strong>programadores e designers</strong> que tentavam calcular
        qual seria o valor da sua hora de trabalho para orçar custos de projeto,
        e se valeria a pena trabalhar como
        <strong> freelancer ou empregado</strong>.
      </p>
      <p>
        É muito comum que as pessoas não levem em consideração uma série de
        custos relacionados e após alguns meses de trabalho, mesmo tendo tido
        diversos projetos, percebam que estão mais e mais sem dinheiro.
      </p>
      <p>
        Essa calculadora visa ajudar a encontrar um valor mais preciso para
        evitar que isso ocorra, mas acima de tudo ajudar a elencar os fatores
        que devemos ter em consideração ao calcular nossos custos ao vender
        trabalho por hora.
      </p>
      <p>
        Esta ferramenta não pretende ser uma solução definitiva, mas um primeiro
        passo.
      </p>

      <p>
        {" "}
        <strong>Espero que seja útil, e compartilhe!</strong>
      </p>
      <p>Abraços,</p>
      <p>André Pessoa</p>
      <div className="action-line">
        <Link
          className={["btn", status ? "" : "btn-disabled"].join(" ")}
          disabled={!status}
          onClick={() => history.goBack()}
        >
          Voltar
        </Link>
      </div>
    </form>
  );
}

export default PanelIntro;
