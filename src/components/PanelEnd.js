import React, { useState } from "react";

import config from "../config";

import Help from "./Help.js";
import resultFormat from "./helpers/resultFormat.js";
import useApi from "./hooks/useAPI.js";
import useInputs from "./hooks/useInputs.js";
import usePanels from "./hooks/usePanel.js";

const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

function PanelEnd() {
  const { loading, result, post, error } = useApi(`${config.apiUrl}/enviar`);
  const [closed, setClosed] = useState(true);
  const { inputs } = useInputs();
  const [email, setEmail] = useState();

  const { nextPanel } = usePanels();

  const send = () => {
    const formatedValues = resultFormat({
      ...inputs,
      tax: inputs.percents.taxPerYear / 12,
    });

    if (email) {
      post({
        email,
        ...formatedValues,
      });
    }
    if (window?.ga) {
      window.ga("send", "event", "Email", "envio", "Envio de email");
    }
  };

  return (
    <form
      onSubmit={nextPanel}
      className={["panel", status ? "panel-complete" : ""].join(" ")}
    >
      <p>
        Calcular o custo da hora, para ser efetivo, deve ser considerado como
        qualquer empreendimento, e levar em conta, além do lucro esperado, os
        investimentos internos do processo e os custos dos insumos relacionados.
      </p>
      <h2>salário .</h2>
      <h2>horas .</h2>
      <h2>custo com equipamentos .</h2>
      <h2>custo com programas .</h2>
      <h2>custo com local .</h2>
      <h2>custo em impostos .</h2>
      <Help header="">
        <p>
          As perguntas desse formulário foram feitas com fins didáticos para
          lembrar detalhes que muitas vezes são esquecidos na hora de
          quantificar os custos da hora do profissional liberal.
        </p>
        <p>
          Os valores utilizados são estimativas, e para um resultado mais
          preciso, ajuste-os à sua realidade.
        </p>
      </Help>
      <button
        className={[
          "btn",
          status ? "" : "btn-disabled",
          !closed ? "hidden" : "",
        ].join(" ")}
        onClick={() => setClosed(false)}
      >
        me manda?
      </button>
      <div className={[closed ? "hidden" : ""].join(" ")}>
        <h2>Seus dados para o envio</h2>
        <p>
          Os dados ao lado serão enviados para o seu e-mail, além de um arquivo
          XLS(planilha).
        </p>
        <input
          name="email"
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          className={[
            "btn",
            status ? "" : "btn-disabled",
            loading ? "highlight" : "",
            error ? "error" : "",
          ].join(" ")}
          disabled={loading || !isEmail(email)}
          onClick={send}
        >
          {error
            ? error
            : loading
            ? "enviando..."
            : !isEmail(email)
            ? "vou precisar do seu email"
            : result
            ? "enviado! = )"
            : "pode mandar!"}
        </button>
      </div>
    </form>
  );
}

export default PanelEnd;
