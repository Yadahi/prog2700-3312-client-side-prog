const INACTIVITY_TIMEOUT_MS = 15000;
const INTERVAL = 1000;
let inactivityTimeoutId;
let countdownIntervalId;
let remainingSeconds = 15;

const items = [
  { id: "milk", name: "Milk", price: 3.5 },
  { id: "bread", name: "Bread", price: 2.0 },
  { id: "eggs", name: "Eggs", price: 4.25 },
  { id: "rice", name: "Rice", price: 5.0 },
  { id: "apples", name: "Apples", price: 3.75 },
  { id: "chicken", name: "Chicken", price: 8.5 },
];

const form = document.getElementById("list-form");
const printBtn = document.getElementById("print-btn");
const resetBtn = document.getElementById("reset-btn");
const itemList = document.getElementById("item-list");
const totalEl = document.getElementById("total-value");
const countdownEl = document.getElementById("countdown");
const receiptEl = document.getElementById("receipt-output");

const buildForm = () => {
  itemList.innerHTML = "";
  items.forEach((item) => {
    const itemElement = document.createElement("li");
    const nameSpan = document.createElement("span");
    const priceSpan = document.createElement("span");
    const quantityInput = document.createElement("input");

    // list name
    nameSpan.textContent = item.name;
    // list price
    priceSpan.textContent = `$${item.price}`;
    // list input
    quantityInput.type = "number";
    quantityInput.id = item.id;
    quantityInput.min = 0;
    quantityInput.value = 0;
    quantityInput.className = "quantity-input";
    // append elements to list item
    itemElement.append(nameSpan, priceSpan, quantityInput);
    // append item element to list
    itemList.append(itemElement);
  });
};

const addInactivityListeners = () => {
  itemList.addEventListener("input", resetInactivityTimers);
};

const calculateTotal = () => {
  let total = 0;
  const cartItems = [];
  items.forEach((item) => {
    const itemInput = document.getElementById(item.id);
    // sanitizing quantity
    let itemQuantity = Number(itemInput.value);
    // reset the input and set the quanity value to zero when not number or negative number
    if (isNaN(itemQuantity) || itemQuantity < 0) {
      itemQuantity = 0;
      itemInput.value = 0;
    }
    // add to total and create the cart array only when item quanity > 0
    if (itemQuantity > 0) {
      const itemTotal = itemQuantity * item.price;
      const itemObject = { ...item, quantity: itemQuantity, total: itemTotal };
      total += itemTotal;
      cartItems.push(itemObject);
    }
  });

  return { total, cartItems };
};

const renderTotal = (total = 0, cartItems = []) => {
  if (cartItems.length === 0) {
    totalEl.textContent = "Cart is empty.";
    return;
  }
  totalEl.textContent = `$${total.toFixed(2)}`;
};

const formatDateTime = () => {
  const date = new Date();
  // I had to google how to correctly use Date and padStart
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 because 0-based
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours(); // 0-23
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  // even after learning modulo 100 times I still struggle to use it
  // I had to google how to count the hourse correctly so the next lines are copied
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // midnight/noon handling
  const hh = String(hours).padStart(2, "0");

  return `${year}-${month}-${day} ${hh}:${minutes} ${ampm}`;
};

const printReceipt = (total = 0, cartItems = []) => {
  // reset the output
  receiptEl.textContent = "";

  if (cartItems.length === 0) {
    receiptEl.textContent = "Cart is empty.";
    return;
  }
  // iterate over and create formatted string output
  let receiptText = `Simple Grocery Store\n${"-".repeat(25)}`;
  cartItems.forEach((item) => {
    const itemLine = `\n${item.name}\tx${item.quantity}\t$${item.total.toFixed(2)}`;
    receiptText += itemLine;
  });
  receiptText += `\n\n\nTOTAL:\t$${total.toFixed(2)}`;
  receiptEl.textContent = receiptText;
};

const resetCart = () => {
  // recet cart
  const inputs = document.querySelectorAll(".quantity-input");
  Array.from(inputs).forEach((input) => {
    input.value = 0;
  });
};

const formatTime = (secs) => {
  // get minutes
  const minutes = Math.floor(secs / 60);
  // return just the remainder
  const seconds = secs % 60;
  // format the string
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const resetInactivityTimers = () => {
  console.log("START TIMER");
  // check if timer and interval exists
  // if exist clear it
  if (inactivityTimeoutId) {
    clearTimeout(inactivityTimeoutId);
  }
  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
  }

  inactivityTimeoutId = setTimeout(() => {
    console.log("RESET");
    resetCart();
    renderTotal();
    receiptEl.textContent = "Cart reset due to inactivity.";
    clearInterval(countdownIntervalId);
    countdownEl.textContent = formatTime(0);
  }, INACTIVITY_TIMEOUT_MS);

  // setting 15 s everytime the function is called
  remainingSeconds = 15;
  // UI starts with 15
  countdownEl.textContent = formatTime(remainingSeconds);

  // countdown
  countdownIntervalId = setInterval(() => {
    remainingSeconds--;
    // reset when hiting zero
    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      clearInterval(countdownIntervalId);
    }
    // display countdown
    countdownEl.textContent = formatTime(remainingSeconds);
  }, INTERVAL);
};

const initializeApp = () => {
  buildForm();
  addInactivityListeners();
  const { total, cartItems } = calculateTotal();
  renderTotal(total, cartItems);
  printReceipt(total, cartItems);
  resetInactivityTimers();
};

initializeApp();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { total, cartItems } = calculateTotal();
  renderTotal(total, cartItems);
  resetInactivityTimers();
});

printBtn.addEventListener("click", () => {
  const { total, cartItems } = calculateTotal();
  renderTotal(total, cartItems);
  printReceipt(total, cartItems);
  resetInactivityTimers();
});

resetBtn.addEventListener("click", () => {
  // renderTotal has default values and therefor can be used to reset total output
  renderTotal();
  // printReceipt has defualt values and therefor can be used to reset receipt output
  printReceipt();
  resetCart();
  resetInactivityTimers();
});
