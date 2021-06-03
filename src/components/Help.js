import React, { useState } from "react";

function Help({ header, children }) {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  var status = open ? "opened" : "closed";

  return (
    <div className={["help", status].join(" ")}>
      <div className="header" onClick={onClick}>
        <span className="text">{header}</span>
        <span
          className={["close", open ? "opened" : "closed"].join(" ")}
        ></span>
      </div>
      <div className="body">{children}</div>
    </div>
  );
}

export default Help;
