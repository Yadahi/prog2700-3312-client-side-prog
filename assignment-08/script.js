/* 
Viliam Vateha
Assignment 8
*/

// DOM element constants
const messageInput = document.getElementById("message-input");
const showMessageBtn = document.getElementById("show-message-btn");
const changeColorBtn = document.getElementById("change-color-btn");
const addNoteBtn = document.getElementById("add-note-btn");
const removeNoteBtn = document.getElementById("remove-note-btn");
const resetBtn = document.getElementById("reset-btn");
const messageCardSection = document.getElementById("message-card-section");
const messageText = document.getElementById("message-text");

// validate the input, when no input it will return undefined
const getValidInput = (inputContent) => {
  const text = inputContent?.value;
  if (!text || text.trim() === "") {
    return;
  }
  return text.trim();
};

const handleShowMessage = () => {
  const input = getValidInput(messageInput);
  // if input is undefined return
  if (!input) {
    return;
  }

  //Make the card visible if hidden
  messageCardSection.style.display = "block";
  //Change its text using textContent
  messageText.textContent = input;
};

// Change the card color
const handleChangeColor = () => {
  messageCardSection.style.backgroundColor = "#FDECEF";
  messageCardSection.style.color = "red";
  messageCardSection.style.borderColor = "red";
};

// Display the message inside a card
const handleAddNote = () => {
  // check if note exist
  const existingNote = document.getElementById("message-note");
  if (existingNote) {
    return;
  }
  // Add a small note dynamically
  const note = document.createElement("p");
  note.id = "message-note";
  note.textContent = "This is a note.";
  // use different color when bg applied
  messageCardSection.style.backgroundColor
    ? (note.style.color = "purple")
    : (note.style.color = "red");
  messageCardSection.appendChild(note);
};

// Remove the note
const handleRemoveNote = () => {
  // check if note exist
  const note = document.getElementById("message-note");
  if (note) {
    note.remove();
  }
};

// Reset the card
const handleReset = () => {
  // remove the card
  messageText.textContent = "";
  messageCardSection.style.display = "none";
  // reset the input value
  messageInput.value = "";
  // reset style - bg color, color, and border color
  messageCardSection.style.backgroundColor = "";
  messageCardSection.style.color = "";
  messageCardSection.style.borderColor = "";
  // remove note if it exist
  handleRemoveNote();
};

// attaching event listener on buttons
showMessageBtn.addEventListener("click", handleShowMessage);
changeColorBtn.addEventListener("click", handleChangeColor);
addNoteBtn.addEventListener("click", handleAddNote);
removeNoteBtn.addEventListener("click", handleRemoveNote);
resetBtn.addEventListener("click", handleReset);
