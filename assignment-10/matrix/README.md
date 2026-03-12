# Professional Improvement Suggestion

In these two functions, printReceipt() and calculateTotal(), we are repeating same calcuclations. The code gets quantity values, calculates the total, sets the total, and displays a message. I would follow the DRY (do not repeat yourself) principle and extract this logic into separate function.

```
function calculateCartTotal(milk, bread, eggs, rice, apples, chicken) {
  return (
    milk * PRICE_MILK +
    bread * PRICE_BREAD +
    eggs * PRICE_EGGS +
    rice * PRICE_RICE +
    apples * PRICE_APPLES +
    chicken * PRICE_CHICKEN
  );
}
```

Another issue with the code, and I am not sure if it is intentional, is that it can create an infinite loop. The startTimer() function is called when the html page is loaded:

```
  <body onload="startTimer()">
```

This will call resetCart() after 15 seconds, and resetCart() calls startTimer() again, which creates a repeating loop.
