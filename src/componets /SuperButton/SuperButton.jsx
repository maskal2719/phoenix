import React from "react";
import s from "../SuperButton/SuperButton.module.css";

const SuperButton = ({ callBack, children }) => {
  return (
    <button className={s.button} onClick={callBack}>
      {children}
    </button>
  );
};

export default SuperButton;
