// get html element
const canvas = document.getElementById("canvas");
// create canva
const ctx = canvas.getContext("2d");
// define canva's height and widht
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 18;
// define how many letters fits in canva
const columns = Math.floor(canvas.width / fontSize);
let drops = [];

for (let i = 0; i < columns; i++) {
  // for every column a random row index will be generated
  // math random return a number bewteen 0 and 0.99..., if it is multiplayd by the height, it will give a random height between the initial height and zero
  // if we divide it by fontSize it will return basically a random row index
  drops[i] = (Math.random() * canvas.height) / fontSize;
}

let num = 0;
function animate() {
  // fill the canva with transparent black layer on top of every frame
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  // it draw a rectangle covering the entire canva
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // set green color
  ctx.fillStyle = "lime";
  // add font
  ctx.font = fontSize + "px monospace";
  num++;

  // iterate over array of random row indexes
  for (let i = 0; i < drops.length; i++) {
    // picks a random letter from the string letters
    // Math.random return number between 0 and 0.99...
    // multiplying the random number with the length of string gives a random position of letter
    // example 36 x 0.73 -> 26.28 - the number needs to be whole therefore Math.floor -> 26
    // charAt return the character at the position
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    // first parameter what we want to draw
    // second from left to right, we get the column times size we get the position in px
    // third we get the row times size we get the position vertically in px
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    // add one to the value at the arrays position
    // modifying values of drop array so when the animate function is called next time
    // it will draw random letter one row below
    drops[i]++;

    // when a certain value of the drops array hit the bottom, it will be reseted to 0 and start from top
    // only when both statements are true, if the value is heigher then the bottom of the canvas AND
    // when random number is greater than 0.97 which means there is 3% chance that will happen
    // there is 3 percent chance for that value that it will be reseted
    // because there are 60 frames per second eventually the value will be reseted
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
      drops[i] = 0;
    }
  }
  // basically run animate function in a loop, this function is called 60 times per second
  requestAnimationFrame(animate);
}

animate();

// add an event listener to a window and listen to a resize of the viewport.
// if resize happens that new widht and height is set fro canvas
// this handles responsivity
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
