document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
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
