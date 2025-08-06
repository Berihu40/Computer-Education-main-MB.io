document.addEventListener('DOMContentLoaded', () => {
  console.log("Welcome to my website!");

  const chatIcon = document.getElementById("chat-icon");
  const chatBox = document.getElementById("chat-box");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");

  let awaitingName = true;

  // Toggle chat box on icon click
  chatIcon.addEventListener("click", () => {
    chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";

    if (chatMessages.innerHTML.trim() === "") {
      botReply("Welcome to Computer Education created by Merhawi Berihu.");
      setTimeout(() => {
        botReply("Please enter your first and last name to continue.");
      }, 1000);
    }
  });

  // Handle user input
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const userMsg = chatInput.value.trim();
      addMessage("You", userMsg);
      chatInput.value = "";

      if (awaitingName) {
        setTimeout(() => {
          botReply(`Thanks, ${userMsg}! You're all set.`);
          awaitingName = false;
        }, 800);
      }
    }
  });

  // Bot reply
  function botReply(message) {
    addMessage("Bot", message);
  }

  // Message UI
  function addMessage(sender, message) {
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
