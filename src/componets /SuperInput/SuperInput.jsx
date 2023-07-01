import React from "react";

const SuperInput = ({ value, typeInput, callback, readonly, min }) => {
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
