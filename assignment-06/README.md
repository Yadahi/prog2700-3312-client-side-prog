### What a callback function is
A callback function is a function that is called inside another function. The callback function is passed as an argument to a function, and it is executed inside the body of that function.

### Where callback functions are used in your code
They are used inside functions such as `map, filter, and reduce`.

### Why `map, filter, and reduce` need callback functions
They expect a function as a parameter because they pass each item from the array into that function. It allows us to iterate over the array. For each element the callback function is called. This allows us to access the items in the array and make changes if needed.