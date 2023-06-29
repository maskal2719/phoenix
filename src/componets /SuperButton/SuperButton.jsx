import React from "react";
import s from "SuperButton.module.css";

const SuperButton = ({ callBack, children }) => {
  return <button onClick={callBack}>{children}</button>;
};

export default SuperButton;
