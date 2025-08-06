document.addEventListener('DOMContentLoaded', () => {
  console.log("Welcome to my website!");

  const chatIcon = document.getElementById("chat-icon");
  const chatBox = document.getElementById("chat-box");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");

  let awaitingName = true;
  let userFirstName = "";

  chatIcon.addEventListener("click", () => {
    chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";

    if (chatMessages.innerHTML.trim() === "") {
      assistantReply("Welcome to Computer Education created by Merhawi Berihu.");
      setTimeout(() => {
        assistantReply("Please enter your first and last name to continue.");
      }, 1000);
    }
  });

  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const userMsg = chatInput.value.trim();
      const lowerMsg = userMsg.toLowerCase();

      // Check for bad language first (before anything)
      const badWords = ["damn", "hell", "shit", "fuck", "bitch", "asshole"];
      if (badWords.some(word => lowerMsg.includes(word))) {
        assistantReply("I would like to keep things respectful, and I will try my best to help you with anything you need.");
        chatInput.value = "";
        return;
      }

      addMessage("You", userMsg);
      chatInput.value = "";

      if (awaitingName) {
        const nameParts = userMsg.split(" ");
        userFirstName = nameParts[0];
        assistantReply(`Great, so what can I help you with ${userFirstName}?`);
        awaitingName = false;
        return;
      }

      // Section guidance
      if (lowerMsg.includes("where") && lowerMsg.includes("learning")) {
        assistantReply("You can access the Learning section by clicking 'Start Learning' in the navigation bar at the top of the page.");
        return;
      }

      if (lowerMsg.includes("where") && lowerMsg.includes("history")) {
        assistantReply("The History section is available by clicking the 'History' link in the top navigation bar.");
        return;
      }

      if (lowerMsg.includes("about")) {
        assistantReply("You can learn more about this site by clicking the 'About' link at the top of the page.");
        return;
      }

      if (lowerMsg.includes("contact")) {
        assistantReply("You can contact us by clicking the 'Contact' link in the navigation bar.");
        return;
      }

      // Default smart-ish reply
      const fallbackReplies = [
        "That's interesting! Can you tell me more?",
        "Hmm, let me think about that...",
        "That's a great question. Let's explore it together.",
        `Could you clarify a bit more, ${userFirstName}?`,
        "I'm always learning! Could you rephrase that for me?"
      ];
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      assistantReply(randomReply);
    }
  });

  function assistantReply(message) {
    const typingMsg = document.createElement("div");
    typingMsg.id = "typing";
    typingMsg.innerHTML = `<em>AI Assistant is typing...</em>`;
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingMsg.remove();
      addMessage("AI Assistant", message);
    }, 1000 + Math.random() * 1000); // delay between 1s and 2s
  }

  function addMessage(sender, message) {
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
