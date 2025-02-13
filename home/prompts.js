const journalPromptsGenerator = () => {
  document.getElementById("prompts__button").addEventListener("click", () => {
    const promptDisplay = document.getElementById("prompts__output");
    const randomPromptIndex = Math.floor(Math.random() * journalPrompts.length);
    const getRandomPrompt = journalPrompts[randomPromptIndex];
    promptDisplay.textContent = getRandomPrompt;
  });
};
journalPromptsGenerator();
