import "./App.css";
import { useState } from "react";

function App() {
  const time = new Date();
  const [typeTime, setTypeTime] = useState("astronomic");
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [endLessonTime, setEndLessonTime] = useState(time);
  time.setHours(7, 0);
  const startLessonTime = new Date();
  startLessonTime.setHours(7, 0);

  typeTime === "academ" ? time.setHours(7, 45) : time.setHours(8, 0);

  const handlePlusTime = () => {
    const timeToAdd = typeTime === "academ" ? 45 : 60;
    const newTime = new Date(endLessonTime.getTime() + timeToAdd * 60000);
    setEndLessonTime(newTime);
    setHoursPerDay((prevState) => prevState + 1);
  };
  const handleMinusTime = () => {
    const timeToAdd = typeTime === "academ" ? 45 : 60;
    const newTime = new Date(endLessonTime.getTime() - timeToAdd * 60000); // Прибавляем минуты в миллисекундах
    setEndLessonTime(newTime);
    setHoursPerDay((prevState) => prevState - 1);
  };

  console.log(endLessonTime);

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
    const currentBreakTime = e.currentTarget.value;
    const newTime = new Date(
      endLessonTime.getTime() + Number(currentBreakTime) * 60000
    );
    setEndLessonTime(newTime);
    console.log(currentBreakTime);
    console.log(newTime);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <select defaultValue={typeTime} onChange={typeTimeChange}>
          <option value="astronomic">Астрономический</option>
          <option value="academ">Академический</option>
        </select>
      </div>
      <div>
        <select onChange={changeAddBreakToEndLessonTime}>
          <option value="0">Без перерыва</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <div style={{ display: "flex" }}>
          <button onClick={handlePlusTime}>+</button>
          <div>{hoursPerDay}</div>
          <button onClick={handleMinusTime}>-</button>
        </div>
      </div>
      <div>
        <input
          readOnly
          type="time"
          value={startLessonTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
        <span>ДО</span>
        <input
          readOnly
          type="time"
          value={endLessonTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      </div>
      <input type="submit" />
    </div>
  );
}

export default App;
