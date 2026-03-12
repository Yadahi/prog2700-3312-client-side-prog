// get html element
const canvas = document.getElementById("canvas");
// create canvas
const ctx = canvas.getContext("2d");
// define canvas height and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 18;
// define how many letters fit in canvas
const columns = Math.floor(canvas.width / fontSize);
let drops = [];

for (let i = 0; i < columns; i++) {
  // for every column a random row index will be generated
  // Math.random returns a number between 0 and 1, if it is multiplied by the height, it will give a random height between the initial height and zero
  // if we divide it by fontSize it will return basically a random row index
  drops[i] = (Math.random() * canvas.height) / fontSize;
}

let num = 0;
function animate() {
  // fill the canvas with transparent black layer on top of every frame
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  // it draws a rectangle covering the entire canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // set green color
  ctx.fillStyle = "lime";
  // add font
  ctx.font = fontSize + "px monospace";
  num++;

  // iterate over array of random row indexes
  for (let i = 0; i < drops.length; i++) {
    // picks a random letter from the string letters
    // Math.random returns a number between 0 and 1
    // multiplying the random number with the length of string gives a random position of letter
    // example 36 x 0.73 -> 26.28 - the number needs to be whole therefore Math.floor -> 26
    // charAt returns the character at the position
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    // first parameter is what we want to draw
    // second from left to right, we get the column times size we get the position in px
    // third we get the row times size we get the position vertically in px
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    // add one to the value at the arrays position
    // modifying values of drop array so when the animate function is called next time
    // it will draw random letter one row below
    drops[i]++;

    // when a certain value of the drops array hits the bottom, it will be reset to 0 and start from top
    // only when both statements are true, if the value is higher than the bottom of the canvas AND
    // when random number is greater than 0.97 which means there is 3% chance that will happen
    // there is 3 percent chance for that value that it will be reset
    // because there are 60 frames per second eventually the value will be reset
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
      drops[i] = 0;
    }
  }
  // basically run animate function in a loop, this function is called 60 times per second
  requestAnimationFrame(animate);
}

animate();

// add an event listener to a window and listen to a resize of the viewport
// if resize happens the new width and height is set for canvas
// this handles responsivity
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
