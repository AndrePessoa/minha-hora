import React, { useEffect, useState } from "react";

import CurrencyInputExternal from "react-currency-input";

const CurrencyInput = React.forwardRef(
  ({ value, name, onChange, readOnly, highlight }, ref) => {
    const [blink, setBlink] = useState(false);
    const [valueInit] = useState(value);

    useEffect(() => {
      if (highlight && value !== valueInit) {
        setBlink(true);
        setTimeout(() => setBlink(false), 200);
      }
    }, [value]);

    return (
      <CurrencyInputExternal
        className={[highlight ? "highlight" : "", blink ? "blink" : ""].join(
          " "
        )}
        name={name}
        ref={ref}
        value={value}
        decimalSeparator=","
        thousandSeparator="."
        onChangeEvent={(event, maskedvalue, floatvalue) =>
          onChange(floatvalue, name)
        }
        prefix="R$ "
        readOnly={readOnly}
      />
    );
  }
);

export default CurrencyInput;
