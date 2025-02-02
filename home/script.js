document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const loadEvents = () => {
    return JSON.parse(localStorage.getItem("calendarEvents")) || [];
  };

  const saveEvents = (events) => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  };

  const handleAddOrUpdateEmotion = () => {
    const selectEmotion = document.getElementById("emotion-selector__dropdown");
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

      const cell = info.dayEl;
      const cellRect = cell.getBoundingClientRect();

      if (selectedDate > today) {
        info.el.style.pointerEvents = "none";
        return;
      }

      const allEvents = calendar.getEvents();
      const existingEvent = allEvents.find(
        (event) => event.startStr === info.dateStr
      );

      const dropdown = document.getElementById(
        "emotion-selector__calendar-dropdown"
      );
      dropdown.classList.remove("hidden");
      dropdown.style.top = `${cellRect.top + window.scrollY}px`;
      dropdown.style.left = `${cellRect.left + window.scrollX}px`;

      dropdown.onchange = () => {
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
          localStorage.setItem("calendarEvents", JSON.stringify(eventsToSave));

          dropdown.classList.add("hidden");
          dropdown.value = "";
        }
      };
    },
  });

  calendar.render();
  handleChangeOfMonth();

  document
    .getElementById("emotion-selector__add-to-calendar")
    .addEventListener("click", handleAddOrUpdateEmotion);

  document.getElementById("prompts__button").addEventListener("click", () => {
    const promptDisplay = document.getElementById("prompts__output");
    const randomPromptIndex = Math.floor(Math.random() * journalPrompts.length);
    const getRandomPrompt = journalPrompts[randomPromptIndex];
    promptDisplay.textContent = getRandomPrompt;
  });

  document
    .getElementById("emotion-selector__reset-calendar")
    .addEventListener("click", () => {
      localStorage.removeItem("calendarEvents");
      alert("Cleared all stored emotions!");
      location.reload();
    });

  const calculateMonthlyMood = (month, year) => {
    // Retrieve saved emotions
    const events = JSON.parse(localStorage.getItem("calendarEvents")) || [];

    // Filter events for the selected month and year
    const monthlyEvents = events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    // Define categories
    const goodEmotions = ["😄"];
    const okayEmotions = ["😐"];
    const badEmotions = ["😡", "😰", "😢"];

    let goodCount = 0;
    let okayCount = 0;
    let badCount = 0;

    // Count emotions
    monthlyEvents.forEach((event) => {
      if (goodEmotions.includes(event.title)) {
        goodCount++;
      } else if (okayEmotions.includes(event.title)) {
        okayCount++;
      } else if (badEmotions.includes(event.title)) {
        badCount++;
      }
    });

    // Determine the month's outcome
    let result = "";
    if (goodCount > okayCount && goodCount > badCount) {
      result = "Good Month";
    } else if (okayCount >= goodCount && okayCount >= badCount) {
      result = "Okay Month";
    } else {
      result = "Bad Month";
    }

    // FIX HERE
    const monthlySummary = document.getElementById(
      "calendar-container__summary"
    );
    monthlySummary.textContent = `${month + 1}/${year}: ${result}`;
  };

  const today = new Date();
  calculateMonthlyMood(today.getMonth(), today.getFullYear());

  // CONTINUE BY MAKING ICON CLICKABLE TO SHOW DESCRIPTION

  // function adjustContentHeight() {
  //   const headerHeight = document.querySelector("#header").offsetHeight;
  //   const landscapeImage = document.querySelector("#landscape");
  //   landscapeImage.style.minHeight = `calc(100vh - ${headerHeight}px)`;
  // }

  // window.addEventListener("load", adjustContentHeight);
  // window.addEventListener("resize", adjustContentHeight);
});
