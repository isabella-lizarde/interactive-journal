document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const loadEvents = () => {
    return JSON.parse(localStorage.getItem("calendarEvents")) || [];
  };

  const saveEvents = (events) => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  };

  const handleAddOrUpdateEmotion = () => {
    const selectEmotion = document.getElementById("select-emotion");
    const selectedEmotion = selectEmotion.value;

    if (!selectedEmotion) {
      alert("Please select an emotion before adding or updating.");
      return;
    }

    const today = new Date();
    const localDate = today.toLocaleDateString("en-CA");

    const allEvents = calendar.getEvents();

    const existingEvent = allEvents.find(
      (event) => event.startStr === localDate
    );

    if (existingEvent) {
      existingEvent.setProp("title", selectedEmotion);
    } else {
      calendar.addEvent({
        title: selectedEmotion,
        start: localDate,
        classNames: ["fc-h-event", "fc-sticky"],
      });
    }

    // const eventsToSave = allEvents.map((event) => ({
    //   title: event.title,
    //   start: event.startStr,
    // }));

    // Save all events to localStorage
    const eventsToSave = [
      ...allEvents.map((event) => ({
        title: event.title,
        start: event.startStr,
      })),
      // Include the new event explicitly if it doesn't already exist
      ...(existingEvent
        ? []
        : [
            {
              title: selectedEmotion,
              start: localDate,
            },
          ]),
    ];

    saveEvents(eventsToSave);
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    contentHeight: "auto",
    events: function (info, successCallback) {
      successCallback(loadEvents());
    },
  });

  calendar.render();

  document
    .getElementById("add-emotion-button")
    .addEventListener("click", handleAddOrUpdateEmotion);
});

document
  .getElementById("clear-emotions-button")
  .addEventListener("click", () => {
    localStorage.removeItem("calendarEvents");
    alert("Cleared all stored emotions!");
    location.reload();
  });

// why doesnt the emotion save the first time

const journalPrompts = () => {};
