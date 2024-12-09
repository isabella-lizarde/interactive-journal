document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const handleAddSelectedEmotion = () => {
    const selectEmotion = document.getElementById("select-emotion");
    const selectedEmotion = selectEmotion.value;

    if (selectedEmotion) {
      const eventTitle = selectedEmotion;
      const today = new Date();
      const localDate = today.toLocaleDateString("en-CA");
      const existingEvents = calendar
        .getEvents()
        .filter((event) => event.startStr === localDate);

      if (existingEvents.length > 0) {
        existingEvents[0].setProp("title", eventTitle);
      } else {
        calendar.addEvent({
          title: eventTitle,
          start: localDate,
          classNames: ["fc-h-event", "fc-sticky"],
        });
      }
    }
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    contentHeight: "auto",
  });
  calendar.render();

  document.addEventListener("click", handleAddSelectedEmotion);
});
