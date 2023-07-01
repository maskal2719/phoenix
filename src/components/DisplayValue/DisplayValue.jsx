import React from "react";
import s from "../DisplayValue/DisplayValue.module.css";

const DisplayValue = ({ displayValue, spanValue }) => {
  return (
    <div className={s.display}>
      <span className={s.value}>{displayValue}</span>
      <span className={s.value}>{spanValue}</span>
    </div>
  );
};

export default DisplayValue;
