const inputSalaryEl = document.querySelector(".input-salary");
const inputVacationEl = document.querySelector(".input-vacation");

const selectEl = document.getElementById("currency") as HTMLSelectElement;
const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);

const workDaysEl = document.getElementById("work-days") as HTMLSelectElement;
const workHours = document.getElementById("work-hours") as HTMLSelectElement;
for (let i: number = 1; i <= 7; i++) {
  let newOption = new Option(i + "");
  workDaysEl.append(newOption);
}
for (let i: number = 1; i <= 24; i++) {
  let newOption = new Option(i + "");
  workHours.append(newOption);
}

const salaryYearEl = document.querySelector(".salary-in-year-value");
const salaryVacationEl = document.querySelector(".salary-in-vacation-value");
const salaryWeekEl = document.querySelector(".salary-in-week-value");
const salaryDayEl = document.querySelector(".salary-in-day-value");
const salaryHourEl = document.querySelector(".salary-in-hour-value");
const salaryMinuteEl = document.querySelector(".salary-in-minute-value");
const salaryRnEl = document.querySelector(".salary-rn-value");

function calcSalaryYear(): number {
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  return Math.round(inputSalaryElValue * 12);
}
function calcSalaryVacation(): number {
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  const inputVacationElValue: number = parseFloat((inputVacationEl as HTMLInputElement).value);
  if (inputVacationElValue) {
    return Math.round((inputSalaryElValue / 30) * inputVacationElValue);
  } else {
    return 0;
  }
}

function calcSalaryWeek(): number {
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  return Math.round((inputSalaryElValue / 30) * parseFloat(workDaysEl.value));
}

function calcSalaryDay(): number {
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  return Math.round((inputSalaryElValue / 30 / 24) * parseFloat(workHours.value));
}

function calcSalaryHour(): number {
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  return Math.round(inputSalaryElValue / 720);
}

function calcSalaryMinute(): string {
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  return (inputSalaryElValue / 720 / 60).toFixed(2);
}
// эту функцию каждую секунду
function calcSalaryRn(): number {
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  return inputSalaryElValue / 720 / 60 / 60;
}

function printResults(): void {
  let select = selectEl.value;
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  if (inputSalaryElValue) {
    salaryYearEl.innerHTML = calcSalaryYear() + " " + select;
    salaryVacationEl.innerHTML = calcSalaryVacation() + " " + select;
    salaryWeekEl.innerHTML = calcSalaryWeek() + " " + select;
    salaryDayEl.innerHTML = calcSalaryDay() + " " + select;
    salaryHourEl.innerHTML = calcSalaryHour() + " " + select;
    salaryMinuteEl.innerHTML = calcSalaryMinute() + " " + select;
  } else {
    salaryYearEl.innerHTML = " 0 " + select;
    salaryVacationEl.innerHTML = " 0 " + select;
    salaryWeekEl.innerHTML = " 0 " + select;
    salaryDayEl.innerHTML = " 0 " + select;
    salaryHourEl.innerHTML = " 0 " + select;
    salaryMinuteEl.innerHTML = " 0 " + select;
  }
}

let rn: number = 1;
setInterval(function () {
  printResults();
  const inputSalaryElValue: number = parseFloat((inputSalaryEl as HTMLInputElement).value);
  let select = selectEl.value;
  if (inputSalaryElValue) {
    salaryRnEl.innerHTML = (calcSalaryRn() * rn).toFixed(6) + " " + select;
    rn++;
  } else {
    salaryRnEl.innerHTML = " 0 " + select;
  }
}, 1000);
