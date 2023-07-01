import React from "react";

const SuperInput = ({ value, typeInput, callback, readonly, className }) => {
  return (
    <input
      style={{width:"100%", border: "1px solid #bebebe"}}
      className={className}
      readOnly={readonly}
      type={typeInput}
      value={value}
      onChange={callback}
    />
  );
};

export default SuperInput;
