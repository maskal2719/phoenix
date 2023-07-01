export function calcEndDate(dateStart, allTime, hoursInDay, daysPerWeek) {
  const days = Math.ceil(allTime / hoursInDay);
  const endDate = new Date(dateStart);
  console.log(dateStart.getDate());
  console.log(endDate);
  endDate.setDate(endDate.getDate() + Math.ceil(days / daysPerWeek) * 7);
  return endDate.toLocaleDateString("en-CA");
}
// function calcEndDate(startDate, daysPerWeek, totalHours, hoursPerDay) {
//   const totalDays = totalHours / hoursPerDay;
//   const totalWeeks = Math.ceil(totalDays / daysPerWeek);
//   const endDate = new Date(startDate);
//   endDate.setDate(startDate.getDate() + (totalWeeks * daysPerWeek));
//   return endDate;
// }
