import "./App.css";
import { useEffect, useState } from "react";
import SuperButton from "./components/SuperButton/SuperButton";
import DisplayValue from "./components/DisplayValue/DisplayValue";
import SuperSelect from "./components/SuperSelect/SuperSelect";
import SuperInput from "./components/SuperInput/SuperInput";
import {
  auditoryOptions,
  breaksTimeOptions,
  teachersOptions,
  typeTimeOptions,
  weeks,
} from "./common/data/data";
import { getCurrentDate } from "./common/utils/getCurrentDate";
import { calcEndDate } from "./common/utils/calcDateCourseEnd";

function App() {
  const currentDate = new Date();
  const [typeTime, setTypeTime] = useState("astronomic");
  const [allCourseTime, setAllCourseTime] = useState(20);
  const [dateCourseStart, setDateCourseStart] = useState(getCurrentDate());
  const [dateCourseEnd, setDateCourseEnd] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [endLessonTime, setEndLessonTime] = useState(currentDate);
  const [previousBreakTime, setPreviousBreakTime] = useState(0);
  const [selectedDays, setSelectedDays] = useState(["ПН", "СР", "ПТ"]);
  const [teach, setTeach] = useState(null);
  const [auditory, setAuditory] = useState(null);
  currentDate.setHours(7, 0);
  const startLessonTime = new Date();
  startLessonTime.setHours(7, 0);
  typeTime === "academ"
    ? currentDate.setHours(7, 45)
    : currentDate.setHours(8, 0);
  const timeToAdd = typeTime === "academ" ? 45 : 60;
  const startLessonToNormalType = startLessonTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endLessonToNormalType = endLessonTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // const mwf = ["ПН", "СР", "ПТ"];
  // const tt = ["ВТ", "ЧТ"];

  useEffect(() => {
    const endDate = calcEndDate(
      dateCourseStart,
      allCourseTime,
      hoursPerDay,
      selectedDays.length
    );
    setDateCourseEnd(endDate);
  }, [allCourseTime, dateCourseStart, hoursPerDay, selectedDays.length]);

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
  const handlePlusAllCourseTime = () => {
    setAllCourseTime((prevState) => prevState + 1);
  };
  const handleMinusAllCourseTime = () => {
    setAllCourseTime((prevState) => prevState - 1);
  };
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
  const changeDay = (weekday) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(weekday)) {
        return prevSelectedDays.filter((day) => day !== weekday);
      } else {
        return [...prevSelectedDays, weekday];
      }
    });
  };

  const setMondayWednesdayFridayClick = () => {
    setSelectedDays(["ПН", "СР", "ПТ"]);
  };
  const setTuesdayThursdayClick = () => {
    setSelectedDays(["ВТ", "ЧТ"]);
  };
  const changeDateCourseStart = (e) => {
    const newDate = e.currentTarget.value;
    setDateCourseStart(newDate);
  };
  const changeTeachHandler = (e) => {
    setTeach(e.currentTarget.value);
  };
  const changeAuditoryHandler = (e) => {
    setAuditory(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      typeTime: typeTime,
      hoursPerDay: hoursPerDay,
      allCourseTime: allCourseTime,
      endLessonTime: endLessonToNormalType,
      previousBreakTime: previousBreakTime,
      selectedDays: selectedDays,
      dateCourseStart: dateCourseStart,
      dateCourseEnd: dateCourseEnd,
      startLessonTime: startLessonToNormalType,
      teach: teach,
      auditory: auditory,
    };
    console.log(data);
    console.log(data);
  };

  return (
    <div className={"main"}>
      <div className={"block"}>
        <div className={"block-itm"}>
          <SuperSelect
            defaultValue={typeTime}
            callback={typeTimeChange}
            options={typeTimeOptions}
          />
        </div>
        <div className={"block-itm"}>
          <SuperButton
            disable={allCourseTime < 2}
            callBack={handleMinusAllCourseTime}
          >
            -
          </SuperButton>
          <DisplayValue
            displayValue={allCourseTime}
            spanValue={"Всего часов"}
          />
          <SuperButton callBack={handlePlusAllCourseTime}>+</SuperButton>
        </div>
        <div className={"block-itm"}>
          <SuperInput
            typeInput={"date"}
            value={dateCourseStart}
            callback={changeDateCourseStart}
          />
          <span className={"span"}>ДО</span>
          <SuperInput
            className={""}
            typeInput={"date"}
            readonly={true}
            value={dateCourseEnd}
          />
        </div>
      </div>
      <div className={"btns"}>
        <button className={"btnDays"} onClick={setMondayWednesdayFridayClick}>
          ПН/СР/ПТ
        </button>
        <button className={"btnDays"} onClick={setTuesdayThursdayClick}>
          ВТ/ЧТ
        </button>
        {weeks.map((el, index) => (
          <button
            key={index}
            onClick={() => changeDay(el)}
            className={
              selectedDays.includes(el) ? "selectedDay btnDays" : "btnDays"
            }
          >
            {el}
          </button>
        ))}
      </div>
      <div className={"block"}>
        <div className={"block-itm"}>
          <SuperSelect
            callback={changeAddBreakToEndLessonTime}
            options={breaksTimeOptions}
          />
        </div>
        <div className={"block-itm"}>
          <SuperButton callBack={handleMinusTime} disable={hoursPerDay < 2}>
            -
          </SuperButton>
          <DisplayValue displayValue={hoursPerDay} spanValue={"Часов в день"} />
          <SuperButton callBack={handlePlusTime} disable={hoursPerDay >= 12}>
            +
          </SuperButton>
        </div>
        <div className={"block-itm"}>
          <SuperInput
            readonly={true}
            typeInput={"time"}
            value={startLessonToNormalType}
          />
          <span className={"span"}>ДО</span>
          <SuperInput
            readonly={true}
            typeInput={"time"}
            value={endLessonToNormalType}
          />
        </div>
      </div>
      <div>
        <SuperSelect options={teachersOptions} callback={changeTeachHandler} />
        <SuperSelect
          options={auditoryOptions}
          callback={changeAuditoryHandler}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Добавить расписание
      </button>
    </div>
  );
}

export default App;
