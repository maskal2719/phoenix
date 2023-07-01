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
import s from "./App.module.css";

function App() {
  const currentDate = new Date();
  const [typeTime, setTypeTime] = useState("astronomic");
  const [allCourseTime, setAllCourseTime] = useState(10);
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

  useEffect(() => {
    const endDate = calcEndDate(
      allCourseTime,
      hoursPerDay,
      selectedDays.length,
      selectedDays
    );
    setDateCourseEnd(endDate);
  }, [
    allCourseTime,
    dateCourseStart,
    hoursPerDay,
    selectedDays.length,
    selectedDays,
  ]);

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
  };

  return (
    <div className={s.main}>
      <div className={s.block}>
        <div className={s.blockItm}>
          <SuperSelect
            defaultValue={typeTime}
            callback={typeTimeChange}
            options={typeTimeOptions}
          />
        </div>
        <div className={s.blockItm}>
          <SuperButton
            anyClassName={s.borderLeftRadius}
            disable={allCourseTime < 2}
            callBack={handleMinusAllCourseTime}
          >
            -
          </SuperButton>
          <DisplayValue
            displayValue={allCourseTime}
            spanValue={"Всего часов"}
          />
          <SuperButton
            callBack={handlePlusAllCourseTime}
            anyClassName={s.borderRightRadius}
          >
            +
          </SuperButton>
        </div>
        <div className={s.blockItm}>
          <SuperInput
            anyClassName={s.borderLeftRadius}
            typeInput={"date"}
            value={dateCourseStart}
            callback={changeDateCourseStart}
          />
          <span className={s.span}>до</span>
          <SuperInput
            anyClassName={s.borderRightRadius}
            typeInput={"date"}
            readonly={true}
            value={dateCourseEnd}
          />
        </div>
      </div>
      <div className={s.btns}>
        <button className={s.btnDays} onClick={setMondayWednesdayFridayClick}>
          ПН/СР/ПТ
        </button>
        <button className={s.btnDays} onClick={setTuesdayThursdayClick}>
          ВТ/ЧТ
        </button>
        {weeks.map((el, index) => (
          <button
            key={index}
            onClick={() => changeDay(el)}
            className={
              selectedDays.includes(el)
                ? `${s.selectedDay} + ' ' + ${s.btnDays}`
                : `${s.btnDays}`
            }
          >
            {el}
          </button>
        ))}
      </div>
      <div className={s.block}>
        <div className={s.blockItm}>
          <SuperSelect
            callback={changeAddBreakToEndLessonTime}
            options={breaksTimeOptions}
          />
        </div>
        <div className={s.blockItm}>
          <SuperButton
            callBack={handleMinusTime}
            disable={hoursPerDay < 2}
            anyClassName={s.borderLeftRadius}
          >
            -
          </SuperButton>
          <DisplayValue displayValue={hoursPerDay} spanValue={"Часов в день"} />
          <SuperButton
            callBack={handlePlusTime}
            disable={hoursPerDay >= 12}
            anyClassName={s.borderRightRadius}
          >
            +
          </SuperButton>
        </div>
        <div className={s.blockItm}>
          <SuperInput
            anyClassName={s.borderLeftRadius}
            readonly={true}
            typeInput={"time"}
            value={startLessonToNormalType}
          />
          <span className={s.span}>до</span>
          <SuperInput
            anyClassName={s.borderRightRadius}
            readonly={true}
            typeInput={"time"}
            value={endLessonToNormalType}
          />
        </div>
      </div>
      <div className={s.selectsBlock}>
        <div className={s.teacherItem}>
          <SuperSelect
            options={teachersOptions}
            callback={changeTeachHandler}
          />
        </div>
        <div className={s.auditoryItem}>
          <SuperSelect
            options={auditoryOptions}
            callback={changeAuditoryHandler}
          />
        </div>
      </div>
      <div className={s.notification}>
        Выбор <b>преподавателя</b> и <b>аудитории</b> не обязателен
      </div>
      <hr />
      <div className={s.btnsControl}>
        <button className={s.submit} type="submit" onClick={handleSubmit}>
          Добавить расписание
        </button>
      </div>
    </div>
  );
}

export default App;
