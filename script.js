const guidelines = {
  "hypertension": "Hypertension is treated by lifestyle changes, such as reducing salt, exercising, and taking medications.",
  "diabetes": "Diabetes management includes monitoring blood sugar, following a healthy diet, and regular exercise."
  // Add more guidelines as needed
};

async function sendMessage() {
  const userMessage = document.getElementById('userInput').value.toLowerCase();
  const chatbox = document.getElementById('chatbox');
  
  const userNode = document.createElement('div');
  userNode.className = 'message user';
  userNode.innerText = 'You: ' + userMessage;
  chatbox.appendChild(userNode);

  // Check if user message matches a known guideline
  if (guidelines[userMessage]) {
    const botNode = document.createElement('div');
    botNode.className = 'message bot';
    botNode.innerText = 'Bot: ' + guidelines[userMessage];
    chatbox.appendChild(botNode);
  } else {
    // Use Hugging Face AI model for general questions
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',  // Replace with your Hugging Face API key
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: userMessage
      })
    });
    
    const botResponse = await response.json();
    const botNode = document.createElement('div');
    botNode.className = 'message bot';
    botNode.innerText = 'Bot: ' + botResponse.generated_text;
    chatbox.appendChild(botNode);
  }
  
  document.getElementById('userInput').value = ''; // clear input field
}
