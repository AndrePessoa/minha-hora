import React, { useEffect, useState } from "react";

function Checkbox({ value, onChange, children }) {
  const [status, setStatus] = useState(!!value);

  useEffect(() => setStatus(!!value), [value]);

  const handleChange = (event) => {
    const value = !status;

    setStatus(value);
    onChange(value);
  };

  return (
    <div className="checkbox-wrapper">
      {children && <label>{children}</label>}
      <button
        className={["checkbox", status ? "checked" : ""].join(" ")}
        onClick={handleChange}
      ></button>
    </div>
  );
}

export default Checkbox;
