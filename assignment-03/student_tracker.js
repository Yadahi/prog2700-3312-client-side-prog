/*

Assignment: 3
Date: Jan 22nd
Author: Viliam Vateha 

*/

// Defines a constant variable that is used across the program.
const TOTAL_ASSIGNMENTS = 5;

// Default user data that is used if the user does not enter all inputs.
// This is mainly for convenient testing.
const defaultUser = {
  studentName: "  Alex Johnson ",
  age: 19,
  program: "IT Programming",
  completedAssignments: 3,
  isLoggedIn: true,
};

// Used to collect all data from the user. As a fallback it returns the defaultUser object.
const getUserInfo = () => {
  const studentName = prompt("Enter your full name (first and last name):");
  const age = prompt("Enter your age:");
  const program = prompt(
    "Enter your program name (IT Programming / Networking program):",
  );
  const completedAssignments = prompt(
    "Enter the number of completed assignments:",
  );
  const isLoggedIn = prompt("Are you logged in? (yes or no):");

  return studentName && age && program && completedAssignments && isLoggedIn
    ? { studentName, age, program, completedAssignments, isLoggedIn }
    : defaultUser;
};

// The first three functions include return statements because I was considering adding validation checks at the end.
// They are not strictly necessary at the moment, but I am keeping them in case the logic changes or the code is extended later.


// This function first checks whether the full name is a string.
// Then it removes leading and trailing whitespace and converts all characters to lowercase.
// Finally, it splits the name into an array and checks whether at least two names are present.
const validateName = (fullName) => {
  if (typeof fullName !== "string") {
    return false;
  }

  const normalizedName = fullName.trim().toLowerCase();
  const hasFirstAndLastName = normalizedName.split(/\s+/).length >= 2;

  if (hasFirstAndLastName) {
    console.log("You entered a first and last name");
  } else {
    console.log("Please enter your full name (first and last)");
  }

  return hasFirstAndLastName;
};

// First, the parseInt function is used to convert the text input into a number.
// If the input is not a valid number, parseInt returns NaN.
// Then the function checks whether the number is valid and whether it is 18 or older.
const validateAge = (age) => {
  const normalizeAge = parseInt(age);
  if (!isNaN(normalizeAge) && normalizeAge >= 18) {
    console.log("Access granted");
  } else {
    console.log("Access denied: Student must be 18 or older");
  }

  return !isNaN(normalizeAge) && normalizeAge >= 18;
};

// First, the value is normalized because the defaultUser object stores isLoggedIn as a boolean.
// If the value is already a boolean, it is kept as is.
// Otherwise, the user input is checked, and the string "yes" is converted to true.
// Any other value is converted to false.
const validateLogin = (isLoggedIn) => {
  let normalizeIsLoggedIn;
  if (typeof isLoggedIn === "boolean") {
    normalizeIsLoggedIn = isLoggedIn;
  } else {
    normalizeIsLoggedIn =
      isLoggedIn.trim().toLowerCase() === "yes" ? true : false;
  }
  if (typeof normalizeIsLoggedIn === "boolean" && !normalizeIsLoggedIn) {
    console.log("Please log in to continue");
  }
  return typeof normalizeIsLoggedIn === "boolean" && normalizeIsLoggedIn;
};

const displayProgram = (program) => {
  switch (program) {
    case "IT Programming":
      console.log("Welcome to the IT Programming program");
      break;
    case "Networking":
      console.log("Welcome to the Networking program");
      break;
    default:
      console.log("Program not recognized");
  }
};

const calculateProgress = (completed, total) => {
  return (completed / total) * 100;
};

// I created a single function for this logic because the steps are closely related.
// It checks whether the input is valid, then displays the number of completed assignments,
// the number of remaining assignments, and the overall progress.
const displayAssignmentProgress = (completedAssignments) => {
  const normalizeCompletedAssignments = parseInt(completedAssignments);
  if (
    isNaN(normalizeCompletedAssignments) ||
    !normalizeCompletedAssignments
  ) {
    console.log("You haven't completed any assignments yet");
    return;
  } else {
    console.log("--- Assignment Progress ---");
    for (let i = 1; i <= normalizeCompletedAssignments; i++) {
      console.log("Assignment " + i + " completed");
    }
  }

  let remaining = TOTAL_ASSIGNMENTS - normalizeCompletedAssignments;
  console.log("--- Remaining Assignments ---");

  while (remaining > 0) {
    console.log("Remaining assignments: " + remaining);
    remaining--;
  }

  const progress = calculateProgress(
    normalizeCompletedAssignments,
    TOTAL_ASSIGNMENTS,
  );
  console.log("Progress: " + progress + "%");
};

const displaySummary = (studentName, age, program, completedAssignments) => {
  console.log("--- Student Summary ---");
  console.log(`Name: ${studentName}`);
  console.log(`Age: ${age}`);
  console.log(`Program: ${program}`);
  console.log(`Completed Assignments: ${completedAssignments}`);
  console.log("----------------------");
};

// This is the main function that runs the program.
const main = () => {
  const { studentName, age, program, completedAssignments, isLoggedIn } =
    getUserInfo();

  validateName(studentName);
  validateAge(age);
  validateLogin(isLoggedIn);

  displayProgram(program);
  displayAssignmentProgress(completedAssignments);
  displaySummary(studentName, age, program, completedAssignments);
};

main();
