```md
# Simple Grocery Store — Option 1 (No Server)

## Goal
Build a very small grocery store webpage where a user selects grocery items, the app calculates the total price, prints a receipt with date and time, and automatically resets the cart after inactivity using a timeout.

**You must use only:**
- `index.html`
- `style.css`
- `script.js`

**No server is allowed.**

---

## Learning objectives
By completing this option, you will practice:

- JavaScript Math for totals
- `Date` object to show date and time on the receipt
- String formatting for clean receipt text
- Timers: `setTimeout` to reset cart after inactivity
- DOM skills: reading inputs, updating the page

---

## Requirements

### 1) Page layout (HTML)
Your page must include:

- A title like: **Simple Grocery Store**
- A list of **at least 6 grocery items**, each with:
  - Item name
  - Price shown
  - Quantity input (`type="number"`)
- Buttons:
  - **Calculate Total**
  - **Print Receipt**
  - **Reset Cart**
- Receipt area (a box or `<pre>`) that shows:
  - Store name
  - Current date and time
  - Item list with quantities and line totals
  - Final total

**Minimum items example (you can choose your own):**
Milk, Bread, Eggs, Rice, Apples, Chicken

---

### 2) Cart and total calculation (JavaScript)
You must:

- Read quantities from the inputs
- Calculate line total for each item: `price * quantity`
- Calculate final total as the sum of all line totals
- Display the total on the page

**Rules:**
- Quantity must not be negative
- If quantity is empty, treat it as `0`
- If all quantities are `0`, show a message like: **“Cart is empty.”**

---

### 3) Receipt with date and time (JavaScript Date)
When the user clicks **Print Receipt**, your receipt must include:

- Date and time using `new Date()`
- A clean readable format (example):

  `2026-02-08 08:15 PM`

You can format it using:
- `getFullYear()`, `getMonth() + 1`, `getDate()`
- `getHours()`, `getMinutes()`
- `padStart(2, "0")`

---

### 4) Auto reset after inactivity (`setTimeout`)
You must implement inactivity handling:

- Inactivity timer starts when the page loads
- Any of these actions should reset the timer:
  - Changing any quantity input
  - Clicking **Calculate Total**
  - Clicking **Print Receipt**
  - Clicking **Reset Cart**
- If the user is inactive for **15 seconds** (for testing):
  - Show a message in the receipt area like: **“Cart reset due to inactivity.”**
  - Clear all quantity inputs
  - Reset total to **$0.00**

Use:
- `setTimeout()` and `clearTimeout()`

---

### 5) CSS (simple styling)
In `style.css`, include:

- A clean layout
- Receipt area styled with:
  - `border`
  - `padding`
  - light background colour
- Buttons with basic spacing

Keep it simple.

---

## Suggested file structure

### `index.html`
- Grocery list and input fields
- Buttons
- Receipt area

### `style.css`
- Layout, spacing, receipt styling

### `script.js`
- Prices stored in an array or object
- Functions:
  - `calculateTotal()`
  - `printReceipt()`
  - `resetCart()`
  - `resetInactivityTimer()`

---

## Submission instructions (Option 1)
Submit in Brightspace:

- GitHub repository link that contains:
  - `index.html`
  - `style.css`
  - `script.js`
- A screenshot of:
  - The receipt showing date/time and total
  - The inactivity reset message

---

## Grading checklist (Option 1)
- Grocery items and quantity inputs exist
- Correct total calculation
- Receipt prints item lines, total, and date/time
- Inactivity timer resets cart correctly
- Code is readable with comments
- Files are named correctly and run without errors
```
