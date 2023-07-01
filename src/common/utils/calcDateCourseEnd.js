export function calcEndDate(allTime, hoursInDay, daysPerWeek, arr) {
  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  const endDate = new Date(currentDate);

  let day = 0;
  let dayAdd = 0;
  const daysOf = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  let indexNameDay = daysOf[currentDate.getDay()];
  const daysNeeded = Math.ceil(allTime / hoursInDay);

  while (day < daysNeeded) {
    if (arr.length === 0) return;
    dayAdd++;
    indexNameDay = daysOf[nextDay.getDay()];
    if (arr.includes(indexNameDay)) {
      day++;
    }
    nextDay.setDate(nextDay.getDate() + 1);
  }

  endDate.setDate(currentDate.getDate() + (dayAdd - 1 / hoursInDay));
  return endDate.toLocaleDateString("en-CA");
}
