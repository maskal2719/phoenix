import React from "react";

const SuperSelect = ({ callback, defaultValue, options }) => {
  return (
    <select defaultValue={defaultValue} onChange={callback}>
      {options &&
        options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.name}
          </option>
        ))}
    </select>
  );
};

export default SuperSelect;
