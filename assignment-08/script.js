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

//Type a message
//Select the card element
//Change its text using textContent
//Make the card visible if hidden

//Display the message inside a card
//Change the card color
//Add a small note dynamically
//Remove the note
//Reset the card

const handleShowMessage = () => {
  console.log("handleShowMessage");
};

const handleChangeColor = () => {
  console.log("handleChangeColor");
};

const handleAddNote = () => {
  console.log("handleAddNote");
};

const handleRemoveNote = () => {
  console.log("handleRemoveNote");
};

const handleReset = () => {
  console.log("handleReset");
};

showMessageBtn.addEventListener("click", handleShowMessage);
changeColorBtn.addEventListener("click", handleChangeColor);
addNoteBtn.addEventListener("click", handleAddNote);
removeNoteBtn.addEventListener("click", handleRemoveNote);
resetBtn.addEventListener("click", handleReset);
