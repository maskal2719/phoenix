import "./App.css";
import { useState } from "react";
import SuperButton from "./componets /SuperButton/SuperButton";
import DisplayValue from "./componets /DisplayValue/DisplayValue";
import SuperSelect from "./componets /SuperSelect/SuperSelect";
import SuperInput from "./componets /SuperInput/SuperInput";
import {
  auditoryOptions,
  breaksTimeOptions,
  teachersOptions,
  typeTimeOptions,
} from "./common/data/data";

function App() {
  const time = new Date();
  const [typeTime, setTypeTime] = useState("astronomic");
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [endLessonTime, setEndLessonTime] = useState(time);
  const [previousBreakTime, setPreviousBreakTime] = useState(0);
  time.setHours(7, 0);
  const startLessonTime = new Date();
  startLessonTime.setHours(7, 0);
  typeTime === "academ" ? time.setHours(7, 45) : time.setHours(8, 0);

  const timeToAdd = typeTime === "academ" ? 45 : 60;
  const handlePlusTime = () => {
    const newTime = new Date(endLessonTime.getTime() + timeToAdd * 60000);
    setEndLessonTime(newTime);
    setHoursPerDay((prevState) => prevState + 1);
  };
  const handleMinusTime = () => {
    const newTime = new Date(endLessonTime.getTime() - timeToAdd * 60000);
    setEndLessonTime(newTime);
    setHoursPerDay((prevState) => prevState - 1);
  };
  const startLessonToNormalType = startLessonTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endLessonToNormalType = endLessonTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const typeTimeChange = (e) => {
    const currentValue = e.currentTarget.value;
    setTypeTime(currentValue);
    if (currentValue === "astronomic") {
      const newTime = new Date(
        endLessonTime.getTime() + 15 * hoursPerDay * 60000
      );
      setEndLessonTime(newTime);
    } else {
      const newTime = new Date(
        endLessonTime.getTime() - 15 * hoursPerDay * 60000
      );
      setEndLessonTime(newTime);
    }
  };

  const changeAddBreakToEndLessonTime = (e) => {
    const currentBreakTime = Number(e.currentTarget.value);
    const timeToAdd = currentBreakTime - previousBreakTime;
    const newTime = new Date(endLessonTime.getTime() + timeToAdd * 60000);
    setEndLessonTime(newTime);
    setPreviousBreakTime(currentBreakTime);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <SuperSelect
          defaultValue={typeTime}
          callback={typeTimeChange}
          options={typeTimeOptions}
        />
        <div style={{ display: "flex" }}>
          <SuperButton callBack={handleMinusTime}>-</SuperButton>
          <DisplayValue displayValue={hoursPerDay} spanValue={"Всего часов"} />
          <SuperButton callBack={handlePlusTime}>+</SuperButton>
        </div>
        <div>
          <SuperInput typeInput={"date"} />
          <span>ДО</span>
          <SuperInput typeInput={"date"} readonly={true} />
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <SuperSelect
          callback={changeAddBreakToEndLessonTime}
          options={breaksTimeOptions}
        />
        <div style={{ display: "flex" }}>
          <SuperButton callBack={handleMinusTime}>-</SuperButton>
          <DisplayValue displayValue={hoursPerDay} spanValue={"Часов в день"} />
          <SuperButton callBack={handlePlusTime}>+</SuperButton>
        </div>
        <div>
          <SuperInput
            readonly={true}
            typeInput={"time"}
            value={startLessonToNormalType}
          />
          <span>ДО</span>
          <SuperInput
            readonly={true}
            typeInput={"time"}
            value={endLessonToNormalType}
          />
        </div>
      </div>
      <div>
        <SuperSelect options={teachersOptions} />
        <SuperSelect options={auditoryOptions} />
      </div>
      <input type="submit" />
    </div>
  );
}

export default App;
