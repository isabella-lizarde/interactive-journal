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

    const eventsToSave = [
      ...allEvents.map((event) => ({
        title: event.title,
        start: event.startStr,
      })),
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

  // setTimeout(() => {
  const handleChangeOfMonth = () => {
    const todayButton = document.querySelector(".fc-today-button");

    if (todayButton) {
      if (todayButton.hasAttribute("disabled")) {
        todayButton.innerHTML = "current month";
        todayButton.title = "at current month";
        console.log(todayButton);
      } else {
        todayButton.innerHTML = "current month";
        todayButton.title = "go to current month";
      }
    } else {
      console.log("The 'fc-today-button' element does not exist.");
    }
    console.log("Attributes:", todayButton.getAttributeNames());
    console.log("Disabled:", todayButton.hasAttribute("disabled"));
  };
  // }, 0);

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    contentHeight: "auto",
    datesSet: function () {
      handleChangeOfMonth();
    },
    events: function (info, successCallback) {
      successCallback(loadEvents());
    },
  });

  calendar.render();
  handleChangeOfMonth();

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

const journalPrompts = () => {};

// const todayButton = () => {
//   const currentDate = document.getElementsByClassName("fc-today-button");
//   console.log(currentDate[0].innerHTML);
// };
// todayButton();
