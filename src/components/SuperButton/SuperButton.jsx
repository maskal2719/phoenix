import React from "react";
import s from "../SuperButton/SuperButton.module.css";

const SuperButton = ({ callBack, children, disable, anyClassName }) => {
  return (
    <button className={`${s.button} ${anyClassName}`} disabled={disable} onClick={callBack}>
      {children}
    </button>
  );
};

export default SuperButton;
