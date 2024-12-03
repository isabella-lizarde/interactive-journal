// const emotionSelector = document.getElementById("emotion-selector");

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    contentHeight: "auto",
    events: [
      {
        title: "Journaling Prompt 1",
        start: "2024-11-25",
        description: "Write about something that made you smile today.",
      },
      {
        title: "Journaling Prompt 2",
        start: "2024-11-26",
        description: "Reflect on a goal you achieved this week.",
      },
    ],
  });

  calendar.render();
});

const handleEmotionSelector = () => {
  const selectEmotion = document.getAttribute("value");
  selectEmotion.forEach((emotion) => {
    emotion.addEventListener("click", () => {
      console.log(emotion);
    });
  });
};
