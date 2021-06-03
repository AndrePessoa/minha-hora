import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import NumberFormat from "react-number-format";
import { Doughnut as PieChart } from "react-chartjs";
import Checkbox from "./ui/Checkbox.js";
import CurrencyInput from "./ui/CurrencyInput";

import useActions from "./hooks/useActions.js";
import useInputs from "./hooks/useInputs.js";
import usePanels from "./hooks/usePanel.js";

function PanelFormComplete() {
  const refSalary = useRef();
  const refResult = useRef();
  const { inputs } = useInputs();
  const { nextPanel } = usePanels();
  const {
    changeSalary,
    changeDays,
    changeHours,
    changeCheckbox,
    changeSub,
    changeSubValue,
    changePerc,
  } = useActions();

  const [isSumVisible, setIsSumVisible] = useState(1);

  useEffect(() => {
    const iobserver = new window.IntersectionObserver(([entry]) =>
      setIsSumVisible(entry.intersectionRatio)
    );
    iobserver.observe(refResult.current.theInput);
  }, []);

  const renderChart = () => {
    const percents = inputs.percents;
    const chartData = [
      {
        color: "#eff286",
        strokeWidth: 0,
        value: percents.personal,
        label: "Pessoal",
      },
      {
        color: "#02C39A",
        strokeWidth: 0,
        value: percents.admin,
        label: "Administração",
      },
      {
        color: "#00A896",
        strokeWidth: 0,
        value: percents.place,
        label: "Insumos",
      },
      {
        color: "#028090",
        strokeWidth: 0,
        value: percents.assets,
        label: "Infra-estrutura",
      },
      {
        color: "#05668D",
        strokeWidth: 0,
        value: percents.tax,
        label: "Impostos",
      },
    ];
    const chartOptions = {
      segmentStrokeWidth: 0,
      segmentStrokeColor: "#3e3e3e",
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
    };
    return (
      <PieChart className={"grafico"} data={chartData} options={chartOptions} />
    );
  };

  return (
    <form
      onSubmit={nextPanel}
      className={["panel-group", "panel-large", "panel-complete"].join(" ")}
    >
      <div className="panel">
        <h3>Valor base</h3>
        <div className="input-line">
          <label>Salário</label>
          <CurrencyInput
            name="salary"
            ref={refSalary}
            value={inputs.salary}
            onChange={(value) => changeSalary(value)}
          />
        </div>
        <h3>Benefícios</h3>
        <div className="input-line">
          <label>Folga nos feriados</label>
          <Checkbox
            name="holidays"
            value={inputs.holidays}
            onChange={(value) => changeCheckbox(value, "holidays")}
          ></Checkbox>
        </div>
        <div className="input-line">
          <label>13o salário</label>
          <Checkbox
            name="annual_bonus"
            value={inputs.annual_bonus}
            onChange={(value) => changeCheckbox(value, "annual_bonus")}
          />
        </div>
        <div className="input-line">
          <label>Dias úteis de férias</label>
          <input
            type="number"
            min="0"
            max="90"
            name="vacation"
            value={inputs.vacation}
            onChange={(event) =>
              changeSub(
                (event.target.value && parseInt(event.target.value)) || "",
                `${event.target.name}`
              )
            }
          />
        </div>
        <div className="input-line">
          <label>Plano de saúde</label>
          <CurrencyInput
            name="health_plan"
            value={inputs.health_plan}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
        <div className="input-line">
          <label>Previdência</label>
          <CurrencyInput
            name="pension"
            value={inputs.pension}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
      </div>
      <div className="panel">
        <h3>Horas produtivas (produção)</h3>
        <div className="input-line">
          <label>Dias por semana</label>
          <input
            type="number"
            min="1"
            max="7"
            name="days"
            defaultValue={inputs.days}
            onChange={(event) => changeDays(event.target.value)}
          />
        </div>
        <div className="input-line">
          <label>Horas por dia</label>
          <input
            type="number"
            min="1"
            max="24"
            name="hours"
            defaultValue={inputs.hours}
            onChange={(event) => changeHours(event.target.value)}
          />
        </div>
        <div className="input-line">
          <label>Administração (%)</label>
          <NumberFormat
            name="admin_time"
            value={inputs.admin_time * 100}
            suffix=" %"
            decimalScale={0}
            allowNegative={false}
            onValueChange={(values, event) =>
              changePerc(values.floatValue, event.target.name)
            }
          />
        </div>
        <div className="input-line">
          <label>Projetos internos (%)</label>
          <NumberFormat
            name="selfprojects_time"
            value={inputs.selfprojects_time * 100}
            suffix=" %"
            decimalScale={0}
            allowNegative={false}
            onValueChange={(values, event) =>
              changePerc(values.floatValue, event.target.name)
            }
          />
        </div>
        <div className="input-line">
          <label>Prospecção (%)</label>
          <NumberFormat
            name="prospect_time"
            value={inputs.prospect_time * 100}
            suffix=" %"
            decimalScale={0}
            allowNegative={false}
            onValueChange={(values, event) =>
              changePerc(values.floatValue, event.target.name)
            }
          />
        </div>
        <div className="input-line">
          <label>Margem de risco (%)</label>
          <NumberFormat
            name="securitymargin_time"
            value={inputs.securitymargin_time * 100}
            suffix=" %"
            decimalScale={0}
            allowNegative={false}
            onValueChange={(values, event) =>
              changePerc(values.floatValue, event.target.name)
            }
          />
        </div>
      </div>
      <div className="panel">
        <h3>Equipamento (capital investido)</h3>
        <div className="input-line">
          <label>custo de hardware</label>
          <CurrencyInput
            name="hardware_buy_cost"
            value={inputs.hardware_buy_cost}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
        <div className="input-line">
          <label>Ciclo de vida (meses)</label>
          <input
            type="number"
            min="0"
            max="96"
            name="hardware_life_circle"
            defaultValue={inputs.hardware_life_circle}
            onChange={(event) =>
              changeSub(event.target.value, event.target.name)
            }
          />
        </div>
        <div className="input-line">
          <label>Preço de revenda</label>
          <CurrencyInput
            name="hardware_sell_cost"
            value={inputs.hardware_sell_cost}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>

        <div className="input-line">
          <label>custo de software (compras)</label>
          <CurrencyInput
            name="software_buy_cost"
            value={inputs.software_buy_cost}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
        <div className="input-line">
          <label>custo de software (assinaturas)</label>
          <CurrencyInput
            name="software_rent_cost"
            value={inputs.software_rent_cost}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
      </div>
      <div className="panel">
        <h3>Local e impostos (custo fíxo)</h3>
        <div className="input-line">
          <label>aluguel do imóvel</label>
          <CurrencyInput
            name="place_rent"
            value={inputs.place_rent}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
        <div className="input-line">
          <label>custo de internet + celular</label>
          <CurrencyInput
            name="place_internet"
            value={inputs.place_internet}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
        <div className="input-line">
          <label>contas gerais do imóvel</label>
          <CurrencyInput
            name="place_bills"
            value={inputs.place_bills}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
        <div className="input-line">
          <label>% da área dedicada do imóvel ao trabalho</label>
          <NumberFormat
            name="place_percent"
            value={inputs.place_percent * 100}
            suffix=" %"
            decimalScale={0}
            allowNegative={false}
            onValueChange={(values, event) =>
              changePerc(values.floatValue, event.target.name)
            }
          />
        </div>
        <div className="input-line">
          <label>custo diário de deslocamento</label>
          <CurrencyInput
            name="place_commute"
            value={inputs.place_commute}
            onChange={(value, name) => changeSubValue(value, name)}
          />
        </div>
        <div className="input-line">
          <label>Impostos por mês</label>
          <CurrencyInput
            name="perhour"
            value={inputs.percents.taxPerYear / 12}
            readOnly={true}
          />
        </div>
      </div>
      <div className="panel">
        <h3>Resultados</h3>

        <div className={["floatTotal", isSumVisible ? "hidden" : ""].join(" ")}>
          <label>Valor por hora</label>
          <CurrencyInput
            name="perhour"
            value={inputs.perHour}
            readOnly={true}
          />
        </div>

        <div className="input-line">
          <label>Valor por hora</label>
          <CurrencyInput
            name="perhour"
            ref={refResult}
            value={inputs.perHour}
            readOnly={true}
          />
        </div>
        <div className="input-line">
          <label>Valor mensal</label>
          <CurrencyInput
            name="perMonth"
            value={inputs.percents.perYear / 12}
            readOnly={true}
          />
        </div>
        <div className="input-line">
          <label>Valor por ano</label>
          <CurrencyInput
            name="perYear"
            value={inputs.percents.perYear}
            onChange
            readOnly={true}
          />
        </div>
        <h3>Proporção da composição de preço</h3>
        {renderChart()}
        <div className="action-line">
          <Link className={["btn"].join(" ")} to={"/end"}>
            que legal! O que mais?
          </Link>
        </div>
      </div>
    </form>
  );
}

export default PanelFormComplete;
