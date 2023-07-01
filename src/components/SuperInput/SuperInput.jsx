import React from "react";
import s from '../SuperInput/SuperInput.module.css'

const SuperInput = ({ value, typeInput, callback, readonly, anyClassName }) => {
  return (
    <input
      className={`${s.input} ${anyClassName}`}
      readOnly={readonly}
      type={typeInput}
      value={value}
      onChange={callback}
    />
  );
};

export default SuperInput;
