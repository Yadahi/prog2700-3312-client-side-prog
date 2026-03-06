# Objective

In this assignment, you will carefully investigate the provided Store Web Page Code that has been attached.

This is not a coding-from-scratch task. Instead, you will practice:

• Reading and understanding existing code
• Explaining how code works
• Writing meaningful comments
• Suggesting professional improvements
• Using GitHub properly

This skill is extremely important in real software development because most developers work on existing projects, not empty files.

## What You Must Do

You are required to:
Read the attached store project carefully.
Investigate every section of the code.
Add detailed explanatory comments directly inside the code.
Suggest one professional improvement.
Upload everything to GitHub.
Attach a screenshot of the rendered page.

## Part 1: Code Investigation and Explanation

Open the attached files (HTML, CSS, and JS ).

Inside the code:

• Add comments above or beside each section
• Explain what each part does
• Explain why it is written that way
• Explain how different parts connect together

Your comments must be clear and educational.

Example:

Instead of writing:

 <div class="product">
 Write something like:

 <!-- This div represents one product card inside the store layout -->
 <div class="product">
 Instead of:

const button = document.getElementById("buyBtn");
Write:

// Select the Buy button so we can attach an event to it later
const button = document.getElementById("buyBtn");
You must explain:

• Structure
• Layout
• Styling logic
• DOM selection
• Events
• Functions
• Calculations
• Any dynamic behavior

## Part 2: Professional Improvement Suggestion

After investigating the project, you must propose ONE change that would make the project more professional.

Examples of acceptable improvements:

• Improve semantic HTML structure
• Improve accessibility
• Improve naming conventions
• Improve UI alignment
• Improve button design
• Improve responsiveness
• Improve JavaScript organization
• Improve input validation

You must:

• Clearly explain the problem
• Explain why it matters
• Show the improved version of the code

This should be written in a separate section in your README file.

## Part 3: GitHub Submission

You must:

Create a new repository named:

store-code-review

Upload:

• All updated project files
• The fully commented code
• A README.md file containing:

A short explanation of the project

Your professional improvement suggestion

What you learned from this investigation

## Part 4: Screenshot Requirement

Run the project in your browser.

Take a screenshot showing:

• The full rendered page
• Clear visible layout

Upload this screenshot inside your repository.

## Submission Checklist

Before submitting, confirm that:

• All code sections contain meaningful comments
• You explained every major part
• You suggested one professional improvement
• The project runs correctly
• GitHub link is working
• Screenshot is uploaded

## Evaluation Rubric

1 Point
Code is uploaded correctly to GitHub

1 Point
All major sections are clearly explained with comments

1 Point
JavaScript logic is properly explained

1 Point
Professional improvement is meaningful and clearly justified

1 Point
Clean structure, readable comments, and screenshot included

## Important Notes

• Do not rewrite the whole project.
• Focus on understanding and explaining.
• Comments must show real understanding.
• Avoid copying explanations from AI tools.
• Use your own words.

---

# Professional Improvement Suggestion

In these two functions, printReceipt() and calculateTotal(), we are repeating same calcuclations. The code gets quantity values, calculates the total, sets the total, and displays a message. I would follow the DRY (do not repeat yourself) principle and extract this logic into separate function.

Another issue with the code, and I am not sure if it is intentional, is that it can create an infinite loop. The startTimer() function is called when the html page is loaded:

```
  <body onload="startTimer()">
```

This will call resetCart() after 15 seconds, and resetCart() calls startTimer() again, which creates a repeating loop.
