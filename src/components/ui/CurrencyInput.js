import currency from "currency.js";
import React, { useCallback, useEffect, useRef, useState } from "react";

import useAnimatedState from "../hooks/useAnimatedState";

function setCaretPosition(elem, caretPos) {
  if (elem != null) {
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.move("character", caretPos);
      range.select();
    } else {
      if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      } else elem.focus();
    }
  }
}

function getCaretPosition(elem) {
  return elem.selectionStart;
}

function formatToCurrency(value) {
  const isCurrency = /R\$\s[0-9.]+,[0-9]{2}/gi.test(value);
  let input = !value || !/R?\$?\s?[0-9.]+,?[0-9]+/gi.test(value) ? 0 : value;
  input = isCurrency ? input.replace(/\./gi, "").replace(/,/gi, ".") : input;
  const numberString = (input || "0").toString().replace(/[^0-9.]/gi, "");
  const numberComplete = parseFloat(numberString).toFixed(2);
  const number = parseFloat(numberComplete);
  const currencyValue = currency(numberComplete, {
    pattern: `R$ #`,
    decimal: ",",
    fromCents: true,
    separator: ".",
  }).format();

  return [currencyValue, number];
}

const CurrencyInput = React.forwardRef(
  ({ value, name, onChange, readOnly, highlight }, ref) => {
    const internalRef = useRef();
    const [blink, setBlink] = useState(false);
    const [valueInit] = useState(value);
    const [val, setVal] = useState(() => formatToCurrency(value)[0]);
    const [animaVal, setAnimaVal] = useAnimatedState(value, 400);

    useEffect(() => {
      setVal(formatToCurrency(value)[0]);
      setAnimaVal(formatToCurrency(value)[1]);

      if (highlight && value !== valueInit) {
        setBlink(true);
        setTimeout(() => setBlink(false), 200);
      }
    }, [value]);

    const onKeyUpHandler = useCallback(
      (event) => {
        const inputDOM = ref?.current ?? internalRef?.current;
        const { value } = event.target;
        const caretPosition = getCaretPosition(inputDOM);
        const [formatedValue, number] = formatToCurrency(value);
        const periodsPrev = (value.substr(0, caretPosition).match(/\./g) || [])
          .length;
        const periodsNext = (
          formatedValue.substr(0, caretPosition).match(/\./g) || []
        ).length;
        const periodsVariation = periodsNext - periodsPrev;

        setVal(formatedValue);
        onChange(number, name);
        setTimeout(
          () => setCaretPosition(inputDOM, caretPosition + periodsVariation),
          0
        );
      },
      [name, val]
    );

    const displayValue = readOnly ? formatToCurrency(animaVal)[0] : val;

    return (
      <input
        className={[highlight ? "highlight" : "", blink ? "blink" : ""].join(
          " "
        )}
        type="text"
        name={name}
        ref={ref ?? internalRef}
        value={displayValue}
        readOnly={readOnly}
        onChange={(event) => onKeyUpHandler(event)}
        onFocus={(event) => setCaretPosition(event.target, 3)}
      />
    );
  }
);

export default CurrencyInput;
