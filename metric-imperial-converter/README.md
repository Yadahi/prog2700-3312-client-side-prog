## Backend Logic Check

1. What `onclick="add()"` does
It calls a javascript `add()` function when an html element is clicked. The `onclick=''` is an attribute on an html element.
The `add()` function must be define in js file or in `script` tag.

Instead of using the `onclick` attribute, I wrapped the inputs and button inside a `<form>` element and used a button with `type="submit"`. By default, submitting a form sends data to a server and reloads the page, so I added an event listener in JavaScript to listen for the submit event. Since there is no server, I prevented the default behavior using `e.preventDefault()`, and then called the `convert()` function manually. With this approach, there is no need to use the onclick attribute in HTML.

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultEl.textContent = "";
  convert();
});
```

2. What `document.getElementById("a").value` returns
It return the current value, usually from a input field, with the id 'a'.

3. Why we use `Number(...)`
The value returned by `document.getElementById("a").value` is a string, even if the input field is of type number.
We use `Number(value)` to convert this string into a numeric value so it can be used in calculations.

4. Where the result is displayed and how it appears on the page
The result is displayed inside an HTML element with the id result. After the conversion is calculated in JavaScript, the result text is inserted into this element.
```html
    <div class="result-container" id="result"></div>
```

```js
  resultEl.classList.add("show-result");
  resultEl.innerText = result;
```

5. One improvement you would add (example: show an error if input is empty)
I would add a history of conversions. Each conversion would be stored in an array and saved in localStorage. After submitting the form or refreshing the page, the stored values would be retrieved and displayed on the page.