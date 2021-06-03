import React from "react";

import CurrencyInputExternal from "react-currency-input";

const CurrencyInput = React.forwardRef(
  ({ value, name, onChange, readOnly }, ref) => {
    return (
      <CurrencyInputExternal
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
