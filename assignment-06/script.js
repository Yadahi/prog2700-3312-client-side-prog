const output = document.getElementById("output");

// Part 1
const expenses = [
  { name: "Lunch", category: "Food", amount: 12 },
  { name: "Bus Ticket", category: "Transport", amount: 4 },
  { name: "Movie", category: "Entertainment", amount: 15 },
  { name: "Groceries", category: "Food", amount: 30 },
  { name: "Train Ticket", category: "Transport", amount: 8 },
  { name: "Concert", category: "Entertainment", amount: 50 },
  { name: "Coffee", category: "Food", amount: 5 },
  { name: "Taxi", category: "Transport", amount: 20 },
  { name: "Museum", category: "Entertainment", amount: 18 },
  { name: "Book", category: "Education", amount: 22 },
  { name: "Gym Membership", category: "Health", amount: 40 },
  { name: "Medicine", category: "Health", amount: 12 },
];

// Part 2
for (const expense of expenses) {
  console.log(`${expense.name} | ${expense.category} | $${expense.amount}`);
}

// Part 3
const expensesWithTax = expenses.map((item) => {
  const itemWithTax = Number((item.amount * 1.15).toFixed(2));

  return { ...item, amount: itemWithTax };
});

console.log("expensesWithTax", expensesWithTax);

// Part 4
const foodExpenses = expenses.filter((item) => {
  return item.category === "Food";
});
console.log("foodExpenses", foodExpenses);

// Part 5
const totalSpent = expenses.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.amount;
}, 0);
console.log("totalSpent", totalSpent);

const totalSpentFood = expenses
  .filter((item) => item.category === "Food")
  .reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);

console.log("totalSpentFood", totalSpentFood);

// Part 6
// in README.md

const expensesWithTaxEl = JSON.stringify(expensesWithTax);
const foodExpensesEl = JSON.stringify(foodExpenses);

output.innerHTML = `
  <h2>Expenses Summary</h2>
  <p><strong>Total spent:</strong> $${totalSpent}</p>
  <p><strong>Total spent on food:</strong> $${totalSpentFood}</p>
  <h3>Expenses with tax</h3>
  <pre>${expensesWithTaxEl}</pre>
  <h3>Food expenses</h3>
  <pre>${foodExpensesEl}</pre>
`;
