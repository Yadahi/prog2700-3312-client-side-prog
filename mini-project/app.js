// Selecting and storing DOM elements
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

// API endpoint URL for Gemini API, with API key injected from CONFIG
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${CONFIG.API_KEY}`;

// Defining the user's data which is an object that hold users text message and uploaded file
const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

// Stores the initial height of the textarea, later used to resize it when the user types multi-line input
const initialInputHeight = messageInput.scrollHeight;
// Array that will hold chat history
const chatHistory = [];

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
  // create div element
  const div = document.createElement("div");
  // add message and custom class
  div.classList.add("message", ...classes);
  // set content to div element
  div.innerHTML = content;
  return div;
};

// Save the chat in LocalStorage
const saveChatHistory = () => {
  // Iterates over chatHistory to filter only the text without files
  const toStore = chatHistory.map((entry) => ({
    role: entry.role,
    parts: [{ text: entry.parts[0].text }],
  }));
  // Save chatHistory in local storage as text
  localStorage.setItem("chatHistory", JSON.stringify(toStore));
};

// Generate bot response using API, it accepts html message parameter
const generateBotResponse = async (incomingMessageDiv) => {
  // takes the element message parameter and get .message-text element
  const messageElement = incomingMessageDiv.querySelector(".message-text");
  // save user text or file input into chat history
  chatHistory.push({
    role: "user",
    parts: [
      {
        text: userData.message,
      },
      ...(userData.file.data ? [{ inline_data: userData.file }] : []),
    ],
  });

  // API request options
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: chatHistory,
    }),
  };

  try {
    // Fetch bot response from API
    const response = await fetch(API_URL, requestOptions);
    // Parses the API response from JSON into a JavaScript object
    const data = await response.json();
    // If response is not valid throw an error
    if (!response.ok) throw new Error(data.error.message);
    // replace "**" from the text which is part of markdown and remove any whitespace
    const apiResponseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();
    // Display the API response text in the message element
    messageElement.innerText = apiResponseText;

    // Save the API response and label it as model response
    chatHistory.push({
      role: "model",
      parts: [
        {
          text: apiResponseText,
        },
      ],
    });
  } catch (error) {
    // Handle error in API response
    console.error(error);
    messageElement.innerText = error.message;
    messageElement.style.color = "#ff0000";
  } finally {
    // Reset user's file data, removing thinking indicator and scroll chat to bottom
    userData.file = {};
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    // Save chat history after every bot response
    saveChatHistory();
  }
};

// Handle outgoing user messages, submits the user input
const handleOutgoingMessage = (e) => {
  // Prevent from submiting the form and refreshing page when clicked the submit button
  e.preventDefault();
  // Remove whitespace from the input and set it as user message
  userData.message = messageInput.value.trim();
  // Reset the input value
  messageInput.value = "";
  // Remove class that styles element when file is uploaded
  fileUploadWrapper.classList.remove("file-uploaded");
  // Manually triggers an input event on textarea.
  // Important for styling the input element, for example when input is
  // removed and we need to set correctly the style of input
  messageInput.dispatchEvent(new Event("input"));

  // Create and display user message. When image is uploaded it is displayed in the message
  const messageContent = `<div class="message-text"></div>${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;

  // Creates an element and display the users input into the chat area
  const outgoingMessageDiv = createMessageElement(
    messageContent,
    "user-message",
  );
  outgoingMessageDiv.querySelector(".message-text").textContent =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  // Scroll to the bottom when the height of the response is more then the height of the chat window
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  // Simulate bot response with thinking indicator after a delay
  setTimeout(() => {
    // Create a message with three dots
    const messageContent = `<span class="bot-avatar material-symbols-outlined"> robot </span>
          <div class="message-text">
            <div class="thinking-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>`;
    // Create element
    const incomingMessageDiv = createMessageElement(
      messageContent,
      "bot-message",
      "thinking",
    );

    chatBody.appendChild(incomingMessageDiv);
    // Call the generateBotResponse
    generateBotResponse(incomingMessageDiv);
  }, 600);
};

// Handle enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  // Remove whitespace from the input field
  const userMessage = e.target.value.trim();

  // Check if the keystroke was Enter, if the message exist, if the Enter was without shift and if the viewport is wider then 768
  if (
    e.key === "Enter" &&
    userMessage &&
    !e.shiftKey &&
    window.innerWidth > 768
  ) {
    handleOutgoingMessage(e);
  }
});

// Style the input element. When input is one line the border radius is 32px if more line it is 15px
messageInput.addEventListener("input", () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius =
    messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Handle file input change
fileInput.addEventListener("change", () => {
  // get the first item from files array
  const file = fileInput.files[0];
  // if no file return
  if (!file) return;

  // Allow browser to read files
  const reader = new FileReader();
  // When file uploaded set the image, add custom class and store the Base64 data URL string and type in userData object
  reader.onload = (e) => {
    fileUploadWrapper.querySelector("img").src = e.target.result;
    fileUploadWrapper.classList.add("file-uploaded");
    const base64String = e.target.result.split(",")[1];

    userData.file = {
      data: base64String,
      mime_type: file.type,
    };
    fileInput.value = "";
  };
  // converts the file into a Base64 data URL string
  reader.readAsDataURL(file);
});

// Cancel file upload
fileCancelButton.addEventListener("click", () => {
  // Reset the user data
  userData.file = {};
  // Remove class
  fileUploadWrapper.classList.remove("file-uploaded");
});

// Picker package that adds emojis, Picker accept options object that define the picker instance
const picker = new EmojiMart.Picker({
  theme: "light",
  skinTonePosition: "none",
  previewPosition: "none",
  // Define what should happen on selecting an emoji
  onEmojiSelect: (emoji) => {
    // Extract the properties selectionStart and selectionEnd from messageInput
    // They define the position where the cursor begins and ends
    const { selectionStart: start, selectionEnd: end } = messageInput;
    // Inserts the selected emoji into the textarea at the cursor position
    messageInput.setRangeText(emoji.native, start, end, "end");
    // Put the focus back on the textarea
    messageInput.focus();
  },
  // Defines what will happen when clicked outside of emoji picker or on the button
  // Open and close the emoji picker
  onClickOutside: (e) => {
    if (e.target.id === "emoji-picker") {
      document.body.classList.toggle("show-emoji-picker");
    } else {
      document.body.classList.remove("show-emoji-picker");
    }
  },
});

document.querySelector(".chat-form").appendChild(picker);

// Load chat history from local storage
const loadChatHistory = () => {
  // Get the saved chat history from local storage
  const stored = localStorage.getItem("chatHistory");
  // If there is no chat history don't do anything
  if (!stored) return;
  // Iterate over the history
  JSON.parse(stored).forEach((entry) => {
    // Push each history entry into the chatHistory object
    chatHistory.push(entry);
    // Get the text
    const text = entry.parts[0].text;
    // Based on the role set correct dom element with custom class
    if (entry.role === "user") {
      // Create the message element and append to chat body element
      const div = createMessageElement(
        `<div class="message-text"></div>`,
        "user-message",
      );
      div.querySelector(".message-text").textContent = text;
      chatBody.appendChild(div);
    } else {
      // Create the message element and append to chat body element
      const div = createMessageElement(
        `<span class="bot-avatar material-symbols-outlined"> robot </span><div class="message-text"></div>`,
        "bot-message",
      );
      div.querySelector(".message-text").textContent = text;
      chatBody.appendChild(div);
    }
  });
  // Scroll at the end of chat
  chatBody.scrollTo({ top: chatBody.scrollHeight });
};

// Define event listeners
// Add event to click event to reset the chat history
document.querySelector("#clear-chat").addEventListener("click", () => {
  // Clear chat history from local storage
  localStorage.removeItem("chatHistory");
  chatHistory.length = 0;
  // Remove all messages except the initial greeting
  while (chatBody.children.length > 1) {
    chatBody.removeChild(chatBody.lastChild);
  }
});

// Add an event click on send button
sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
// Add an click event on attachment button
document
  .querySelector("#file-upload")
  .addEventListener("click", () => fileInput.click());

// Add an click event on chatbot button to open and close chatbot
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot"),
);

// Add an click event on close button in the header of chatbot
closeChatbot.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot"),
);

loadChatHistory();
