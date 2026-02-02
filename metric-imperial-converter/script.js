/*

Assignment: 4
Date: Feb 2nd
Author: Viliam Vateha 

*/

// Get the conversion form element
const form = document.getElementById("convert-from");
// Get the result display element
const resultEl = document.getElementById("result");

// Set of conversion functions for metric to imperial units
const convertCelsius = (value) => {
  return ((value * 9) / 5 + 32).toFixed(2);
};

const convertMiles = (value) => {
  return (value * 0.621371).toFixed(2);
};

const convertFeet = (value) => {
  return (value * 3.28084).toFixed(2);
};

const convertInches = (value) => {
  return (value * 0.393701).toFixed(2);
};

const convertPounds = (value) => {
  return (value * 2.20462).toFixed(2);
};

const convertGallons = (value) => {
  return (value * 0.264172).toFixed(2);
};

const convertOunces = (value) => {
  return (value * 0.035274).toFixed(2);
};

// Function called when the form is submitted.
const convert = () => {
  // Gets the input values and renders the conversion result.
  const inputValue = document.getElementById("value-input").value;
  const selectValue = document.getElementById("value-select").value;

  // Check if user entered a number and selected a conversion type.
  // If either input is missing, show an alert message.
  const invalidInput = inputValue === "" || inputValue === null;
  if (invalidInput || !selectValue) {
    resultEl.classList.add("show-result");
    resultEl.innerText = "Please enter a value and select a conversion type";
    return;
  }

  let result;
  let converted;
  // Switch statement to correctly calculate the conversion based on the selected type
  switch (selectValue) {
    case "celsius":
      converted = convertCelsius(Number(inputValue));
      result = `${inputValue} °C = ${converted} °F`;
      break;
    case "kilometers":
      converted = convertMiles(Number(inputValue));
      result = `${inputValue} km = ${converted} miles`;
      break;
    case "meter":
      converted = convertFeet(Number(inputValue));
      result = `${inputValue} m = ${converted} ft`;
      break;
    case "centimeters":
      converted = convertInches(Number(inputValue));
      result = `${inputValue} cm = ${converted} in`;
      break;
    case "kilograms":
      converted = convertPounds(Number(inputValue));
      result = `${inputValue} kg = ${converted} lbs`;
      break;
    case "liters":
      converted = convertGallons(Number(inputValue));
      result = `${inputValue} L = ${converted} gal`;
      break;
    case "grams":
      converted = convertOunces(Number(inputValue));
      result = `${inputValue} g = ${converted} oz`;
      break;
    default:
      result = "Invalid selection";
      break;
  }
  // Show the result
  resultEl.classList.add("show-result");
  resultEl.innerText = result;
};

// Prevent the form from submitting to the server and reloading the page.
// Reset the result element and call the conversion function.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultEl.textContent = "";

  convert();
});
