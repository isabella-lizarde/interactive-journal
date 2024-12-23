// import journalPrompts from "./journalPrompts.js";

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

    const today = new Date().toLocaleDateString("en-CA");

    const allEvents = calendar.getEvents();

    const existingEvent = allEvents.find((event) => event.startStr === today);

    if (existingEvent) {
      existingEvent.setProp("title", selectedEmotion);
    } else {
      calendar.addEvent({
        title: selectedEmotion,
        start: today,
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
              start: today,
            },
          ]),
    ];

    saveEvents(eventsToSave);
  };

  const handleChangeOfMonth = () => {
    const todayButton = document.querySelector(".fc-today-button");

    if (todayButton) {
      todayButton.innerHTML = "current month";
      if (todayButton.hasAttribute("disabled")) {
        todayButton.title = "at current month";
      } else {
        todayButton.title = "go to current month";
      }
    } else {
      console.log("The 'fc-today-button' element does not exist.");
    }
  };

  const updateDayClasses = () => {
    const allDays = document.querySelectorAll(".fc-daygrid-day");
    const allEvents = calendar.getEvents();
    const today = new Date().toLocaleDateString("en-CA");

    allDays.forEach((day) => {
      const dateStr = day.getAttribute("data-date"); // Get the date in 'YYYY-MM-DD' format
      const hasEvent = allEvents.some((event) => event.startStr === dateStr);

      if (!hasEvent && dateStr < today) {
        day.classList.add("no-event-previous-date");
      } else {
        day.classList.remove("no-event-previous-date");
      }
    });
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    contentHeight: "auto",
    events: loadEvents(),
    datesSet: handleChangeOfMonth,
    updateDayClasses,
    eventContent: updateDayClasses,
    eventDidMount: updateDayClasses,
    events: function (info, successCallback) {
      successCallback(loadEvents());
    },
    dateClick: function (info) {
      const selectedDate = new Date(info.dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        return;
      }

      const allEvents = calendar.getEvents();
      const existingEvent = allEvents.find(
        (event) => event.startStr === info.dateStr
      );

      const dropdown = document.getElementById("select-emotion-calendar");

      const cell = info.dayEl;
      const cellRect = cell.getBoundingClientRect();
      dropdown.style.top = `${cellRect.top + window.scrollY}px`;
      dropdown.style.left = `${cellRect.left + window.scrollX}px`;

      dropdown.classList.remove("hidden");

      const onDropdownChange = () => {
        const selectedEmotion = dropdown.value;

        if (selectedEmotion) {
          if (existingEvent) {
            existingEvent.setProp("title", selectedEmotion);
          } else {
            calendar.addEvent({
              title: selectedEmotion,
              start: info.dateStr,
              classNames: ["fc-h-event", "fc-sticky"],
            });
          }

          const eventsToSave = calendar.getEvents().map((event) => ({
            title: event.title,
            start: event.startStr,
          }));
          saveEvents(eventsToSave);

          dropdown.classList.add("hidden");
        }
      };

      dropdown.removeEventListener("change", onDropdownChange);
      dropdown.addEventListener("change", onDropdownChange);

      const closeDropdown = (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.add("hidden");
          document.removeEventListener("click", closeDropdown);
        }
      };
      document.addEventListener("click", closeDropdown, { once: true });
    },
  });

  calendar.render();
  handleChangeOfMonth();

  document
    .getElementById("add-emotion-button")
    .addEventListener("click", handleAddOrUpdateEmotion);

  document.getElementById("prompt-button").addEventListener("click", () => {
    const promptDisplay = document.getElementById("prompt-display");
    const randomPromptIndex = Math.floor(Math.random() * journalPrompts.length);
    const getRandomPrompt = journalPrompts[randomPromptIndex];
    promptDisplay.textContent = getRandomPrompt;
  });

  document
    .getElementById("clear-emotions-button")
    .addEventListener("click", () => {
      localStorage.removeItem("calendarEvents");
      alert("Cleared all stored emotions!");
      location.reload();
    });
});
