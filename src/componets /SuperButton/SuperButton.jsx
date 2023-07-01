import React from "react";
import s from "../SuperButton/SuperButton.module.css";

const SuperButton = ({ callBack, children, disable }) => {
  return (
    <button className={s.button} disabled={disable} onClick={callBack}>
      {children}
    </button>
  );
};

export default SuperButton;
