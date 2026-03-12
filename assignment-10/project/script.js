// declare timer variable
let timer;

// defined constants at the beginning of the file.
// these values represent item prices and should not change during exection of code
// Prices (fixed, easy)
const PRICE_MILK = 3.5;
const PRICE_BREAD = 2.25;
const PRICE_EGGS = 4.1;
const PRICE_RICE = 6.0;
const PRICE_APPLES = 2.8;
const PRICE_CHICKEN = 9.5;

// function that clears previous timer and will start a new timer
function startTimer() {
  clearTimeout(timer);

  // initialize the timer variable using setTimeout
  // this stores reference to the timer (timer ID) and can be cleared later
  // after 15 second, it calls the resetCart with a message
  timer = setTimeout(function () {
    resetCart("Cart reset due to inactivity.");
  }, 15000);
}

// validation function that check if value is valid
// if the value is invalid, it is set to zero and returned
function readQty(id) {
  // find the element by id, read its value, and convert it to a number
  let v = Number(document.getElementById(id).value);
  // if the element's value is empty, set the variable v to zero
  if (!document.getElementById(id).value) v = 0;
  // if the variable is not a valid number or the value is less than zero, set it to zero
  if (isNaN(v) || v < 0) v = 0;

  // set the validated value back to the element
  document.getElementById(id).value = v;
  // return the validated number
  return v;
}

// find element with id total and display the amount with a dollar sign
// the value is formatted to two decimal places
function setTotal(amount) {
  document.getElementById("total").textContent = "$" + amount.toFixed(2);
}

// function that calculates the total based on quantity and price
function calculateTotal() {
  // reset the previous timer and start a new timer
  startTimer();

  // get the validated quantity for each item in the item cards
  let milk = readQty("milk");
  let bread = readQty("bread");
  let eggs = readQty("eggs");
  let rice = readQty("rice");
  let apples = readQty("apples");
  let chicken = readQty("chicken");

  // calculate total price - quantity multiplied by item price
  let total =
    milk * PRICE_MILK +
    bread * PRICE_BREAD +
    eggs * PRICE_EGGS +
    rice * PRICE_RICE +
    apples * PRICE_APPLES +
    chicken * PRICE_CHICKEN;

  // call setTotal() function to display the total price
  setTotal(total);

  // display a message depending on whether the cart is empty
  if (milk + bread + eggs + rice + apples + chicken === 0) {
    document.getElementById("receipt").textContent = "Cart is empty.";
  } else {
    document.getElementById("receipt").textContent =
      "Total calculated. Click Print Receipt.";
  }
}

// function that takes a js Date object and formats it
function formatDateTime(d) {
  // get the year
  const yyyy = d.getFullYear();

  // get the month and add leading zero if needed (padStart adds characters at the beginning of a string)
  const mm = String(d.getMonth() + 1).padStart(2, "0");

  // get the day
  const dd = String(d.getDate()).padStart(2, "0");

  // get the hours
  let h = d.getHours();

  // decide if it is pm or am
  const ampm = h >= 12 ? "PM" : "AM";

  // uses modulo to convert from 24-hour format to 12
  h = h % 12;
  // if the hour becomes 0 change it to 12
  if (h === 0) h = 12;

  // format hour and minutes with two digits
  const hh = String(h).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  // return the formatted date and time
  return `${yyyy}-${mm}-${dd} ${hh}:${min} ${ampm}`;
}

function printReceipt() {
  // reset the previous timer and start a new timer
  startTimer();

  // get the validated quantity for each item in the item cards
  let milk = readQty("milk");
  let bread = readQty("bread");
  let eggs = readQty("eggs");
  let rice = readQty("rice");
  let apples = readQty("apples");
  let chicken = readQty("chicken");

  // if no tiems were selected, show empty cart message and stop execution
  if (milk + bread + eggs + rice + apples + chicken === 0) {
    setTotal(0);
    document.getElementById("receipt").textContent = "Cart is empty.";
    return;
  }

  // calculate price for each item
  let milkLine = milk * PRICE_MILK;
  let breadLine = bread * PRICE_BREAD;
  let eggsLine = eggs * PRICE_EGGS;
  let riceLine = rice * PRICE_RICE;
  let applesLine = apples * PRICE_APPLES;
  let chickenLine = chicken * PRICE_CHICKEN;

  // calculate total price and call setTotal() function to display it
  let total =
    milkLine + breadLine + eggsLine + riceLine + applesLine + chickenLine;
  setTotal(total);

  // create a JS Date object
  // it return the current date in format "Fri Mar 06 2026 12:59:37 GMT-0400 (Atlantic Standard Time)"
  const now = new Date();
  // format the date
  const when = formatDateTime(now);

  // initialize an empty string for the receipt text
  let text = "";
  // add store name with date/time
  text += "Green Basket Grocery\n";
  text += "Date/Time: " + when + "\n";
  text += "-----------------------------\n";
  // add receipt items
  if (milk > 0) text += "Milk x" + milk + " = $" + milkLine.toFixed(2) + "\n";
  if (bread > 0)
    text += "Bread x" + bread + " = $" + breadLine.toFixed(2) + "\n";
  if (eggs > 0) text += "Eggs x" + eggs + " = $" + eggsLine.toFixed(2) + "\n";
  if (rice > 0) text += "Rice x" + rice + " = $" + riceLine.toFixed(2) + "\n";
  if (apples > 0)
    text += "Apples x" + apples + " = $" + applesLine.toFixed(2) + "\n";
  if (chicken > 0)
    text += "Chicken x" + chicken + " = $" + chickenLine.toFixed(2) + "\n";

  // add final total
  text += "-----------------------------\n";
  text += "FINAL TOTAL: $" + total.toFixed(2) + "\n";
  text += "Thank you for shopping!\n";
  // display the receipt text
  document.getElementById("receipt").textContent = text;
}

// reset cart
function resetCart(message) {
  document.getElementById("milk").value = 0;
  document.getElementById("bread").value = 0;
  document.getElementById("eggs").value = 0;
  document.getElementById("rice").value = 0;
  document.getElementById("apples").value = 0;
  document.getElementById("chicken").value = 0;

  setTotal(0);
  document.getElementById("receipt").textContent = message;

  // reset the previous timer and start a new timer
  startTimer();
}
