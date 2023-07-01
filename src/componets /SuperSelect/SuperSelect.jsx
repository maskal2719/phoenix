import React from "react";
import s from "./SuperSelect.module.css";
const SuperSelect = ({ callback, defaultValue, options, placeholder }) => {
  return (
    <select
      className={s.select}
      defaultValue={defaultValue}
      onChange={callback}
      placeholder={placeholder}
    >
      {options &&
        options.map((el) => (
          <option key={el?.value} value={el?.value}>
            {el.name}
          </option>
        ))}
    </select>
  );
};

export default SuperSelect;
