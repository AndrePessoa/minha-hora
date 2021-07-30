import currencyLib from "currency.js";

const currency = (value) =>
  currencyLib(value, {
    pattern: `R$ #`,
    decimal: ",",
    separator: ".",
  }).format();
const percent = (value) => `${Math.round(value * 100)} %`;
const days = (value) => `${value} dias`;
const hours = (value) => `${value} horas`;
const months = (value) => `${value} meses`;
const boolean = (value) => (value ? "sim" : "não");
const simple = (value) => value;

const formatTable = {
  salary: currency,
  days: days,
  hours: hours,
  vacations: days,
  holidays: boolean,
  annual_bonus: boolean,
  health_plan: currency,
  //
  admin_time: percent,
  selfprojects_time: percent,
  prospect_time: percent,
  securitymargin_time: percent,
  hardware_buy_cost: currency,
  hardware_life_circle: months,
  hardware_sell_cost: currency,
  software_buy_cost: currency,
  software_rent_cost: currency,
  place_rent: currency,
  place_bills: currency,
  place_internet: currency,
  place_commute: currency,
  place_percent: percent,
  tax: currency,
  perHour: currency,
};

export default (values) =>
  Object.keys(values).reduce((acc, curr) => {
    return formatTable[curr]
      ? {
          ...acc,
          [curr]: formatTable[curr]?.(values[curr]),
        }
      : acc;
  }, {});
