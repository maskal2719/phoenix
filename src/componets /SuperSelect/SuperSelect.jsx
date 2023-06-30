import React from "react";

const SuperSelect = ({ callback, defaultValue, options }) => {
  return (
    <select defaultValue={defaultValue} onChange={callback}>
      {options.map((el) => (
        <option value={el.value}>{el.name}</option>
      ))}
    </select>
  );
};

export default SuperSelect;
