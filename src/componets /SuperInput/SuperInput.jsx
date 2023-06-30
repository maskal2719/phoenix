import React from "react";

const SuperInput = ({ value, typeInput, callback, readonly }) => {
  return (
    <input
      readOnly={readonly}
      type={typeInput}
      value={value}
      onChange={callback}
    />
  );
};

export default SuperInput;
