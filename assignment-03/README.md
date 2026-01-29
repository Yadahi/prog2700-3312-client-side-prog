# Student Access and Activity Tracker (JavaScript)


## Part 1: Declare Variables and Collect Data

Create variables to store the following information:

* Student full name
* Student age
* Program name
* Number of completed assignments
* Whether the student is logged in

### Example Starter Code

```js
let studentName = "Alex Johnson";
let age = 19;
const program = "IT Programming";
let completedAssignments = 3;
let isLoggedIn = true;
```

---

## Part 2: Validate Input Using Conditionals

### Age Validation

Check if the student is eligible based on age.

**Rules:**

* If age is less than 18 → access is denied
* If age is 18 or more → access is allowed

```js
if (age < 18) {
  console.log("Access denied: Student must be 18 or older");
} else {
  console.log("Access granted");
}
```

### Login Validation

Check if the student is logged in.

```js
if (!isLoggedIn) {
  console.log("Please log in to continue");
}
```

---

## Part 3: Use `switch` to Check Program Type

Based on the program name, display a message.

### Programs

* IT Programming
* Networking
* Cybersecurity
* Other

```js
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
```

---

## Part 4: Use Loops to Track Assignment Progress

### Using a `for` Loop

Display assignment completion messages.

```js
for (let i = 1; i <= completedAssignments; i++) {
  console.log("Assignment " + i + " completed");
}
```

### Using a `while` Loop

Simulate remaining assignments.

```js
let remaining = 5 - completedAssignments;

while (remaining > 0) {
  console.log("Remaining assignments: " + remaining);
  remaining--;
}
```

---

## Part 5: Write and Call Functions

### Function to Display Student Summary

```js
function displaySummary(name, program) {
  console.log("Student Name: " + name);
  console.log("Program: " + program);
}
```

Call the function:

```js
displaySummary(studentName, program);
```

---

### Function with Return Value

```js
function calculateProgress(completed, total) {
  return (completed / total) * 100;
}

let progress = calculateProgress(completedAssignments, 5);
console.log("Progress: " + progress + "%");
```

---

## Part 6: Use an Arrow Function for Validation

Create an arrow function that checks if the student has passed based on completed assignments.

**Rule:**

* Pass if completed assignments are **3 or more**

```js
const hasPassed = completed => completed >= 3;

if (hasPassed(completedAssignments)) {
  console.log("Status: Passed");
} else {
  console.log("Status: Not Passed");
}
```

---

## Bonus Task (Optional)

You may add one or more of the following:

* Validate that the student name is not empty
* Use `typeof` to check data types
* Ask the user for input using `prompt()`
* Add more program options to the `switch` statement

---


