import React from "react";

const SuperInput = ({ value, typeInput, callback, readonly, className }) => {
  return (
    <input
      className={className}
      readOnly={readonly}
      type={typeInput}
      value={value}
      onChange={callback}
    />
  );
};

export default SuperInput;
