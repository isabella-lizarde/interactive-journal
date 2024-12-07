// const emotionSelector = document.getElementById("emotion-selector");

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const handleAddSelectedEmotion = () => {
    const selectEmotion = document.getElementById("select-emotion");
    const selectedEmotion = selectEmotion.value;
    // console.log(selectedEmotion);
    if (selectedEmotion) {
      const eventTitle = selectedEmotion;
      const today = new Date();
      const localDate = today.toLocaleDateString("en-CA");
      console.log(localDate);

      calendar.addEvent({
        title: eventTitle,
        start: localDate,
        classNames: ["fc-h-event", "fc-sticky"],
      });
    }
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    contentHeight: "auto",
  });

  calendar.render();

  document.addEventListener("click", handleAddSelectedEmotion);
});

// const handleAddSelectedEmotion = () => {
//   const selectEmotion = document.getElementById("select-emotion");
//   const selectedEmotion = selectEmotion.value;
//   console.log(selectedEmotion);
//   if (selectedEmotion) {

//   }
// };
