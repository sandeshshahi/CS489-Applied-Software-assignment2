import { Employee } from "./Employee";
import { PensionPlan } from "./PensionPlan";

function getEndOfQuarter(date: Date, quarterOffset: number = 0): Date {
  const currentMonth = date.getMonth();
  const currentQuarter = Math.floor(currentMonth / 3);
  const targetQuarter = currentQuarter + quarterOffset;

  // The 0th day of the next month is the last day of the current month
  const endMonth = (targetQuarter + 1) * 3;
  return new Date(date.getFullYear(), endMonth, 0);
}

function addOneYear(date: Date): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
}

function isEligibleByDate(employee: Employee, targetDate: Date): boolean {
  if (employee.pensionPlan) return false;
  if (employee.yearlySalary < 100000.0) return false;

  const oneYearAnniversary = addOneYear(employee.employmentDate);
  return oneYearAnniversary.getTime() <= targetDate.getTime();
}

// --- Data Initialization ---
function loadData(): Employee[] {
  const employees: Employee[] = [];

  const e1 = new Employee(
    1,
    "Daniel",
    "Agar",
    new Date("2025-08-17"),
    105945.5,
  );

  const e2 = new Employee(
    2,
    "Benard",
    "Shaw",
    new Date("2025-02-03"),
    197750.0,
  );
  e2.pensionPlan = new PensionPlan("EX0089", new Date("2026-02-03"), 450.0);

  const e3 = new Employee(
    3,
    "Carly",
    "Jones",
    new Date("2024-05-16"),
    842000.75,
  );
  e3.pensionPlan = new PensionPlan("SM2307", new Date("2025-05-17"), 1555.5);

  const e4 = new Employee(
    4,
    "Wesley",
    "Schneider",
    new Date("2025-04-30"),
    174500.0,
  );
  const e5 = new Employee(
    5,
    "Anna",
    "Wiltord",
    new Date("2025-09-15"),
    185750.0,
  );
  const e6 = new Employee(
    6,
    "Yosef",
    "Tesfalem",
    new Date("2025-07-31"),
    100000.0,
  );
  const e7 = new Employee(
    7,
    "Johnny",
    "Edwards",
    new Date("2025-07-09"),
    95500.0,
  );

  employees.push(e1, e2, e3, e4, e5, e6, e7);
  return employees;
}

// --- Main Execution ---
function main() {
  const employees = loadData();

  console.log("--- FEATURE 1: ALL EMPLOYEES ---");
  const allEmployeesSorted = [...employees].sort((a, b) => {
    if (b.yearlySalary !== a.yearlySalary) {
      return b.yearlySalary - a.yearlySalary; // Descending salary
    }
    return a.lastName.localeCompare(b.lastName); // Ascending last name
  });
  console.log(JSON.stringify(allEmployeesSorted, null, 2));

  // Determine Quarters
  const today = new Date(); // Use current system date
  const endOfCurrentQtr = getEndOfQuarter(today, 0);
  const endOfNextQtr = getEndOfQuarter(today, 1);

  console.log("\n--- FEATURE 2: CURRENT QUARTERLY ENROLLEES ---");
  const currentEnrollees = employees
    .filter((e) => isEligibleByDate(e, endOfCurrentQtr))
    .sort((a, b) => b.employmentDate.getTime() - a.employmentDate.getTime()); // Descending employment date
  console.log(JSON.stringify(currentEnrollees, null, 2));

  console.log("\n--- FEATURE 3: NEXT QUARTERLY UPCOMING ENROLLEES ---");
  const nextEnrollees = employees
    .filter((e) => !isEligibleByDate(e, endOfCurrentQtr)) // Not eligible in current
    .filter((e) => isEligibleByDate(e, endOfNextQtr)) // Will be eligible by next
    .sort((a, b) => {
      const dateDiff = b.employmentDate.getTime() - a.employmentDate.getTime();
      if (dateDiff !== 0) return dateDiff; // Descending employment date
      return a.yearlySalary - b.yearlySalary; // Ascending yearly salary
    });
  console.log(JSON.stringify(nextEnrollees, null, 2));
}

main();
