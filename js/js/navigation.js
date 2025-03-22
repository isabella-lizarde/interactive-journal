document.addEventListener("DOMContentLoaded", function () {
  const pages = ["pages/home.html", "pages/prompts.html"]; // Add your pages here
  let currentIndex = 0;
  const pageContent = document.getElementById("page-content");
  //   const prevBtn = document.querySelector(".prev-btn");
  //   const nextBtn = document.querySelector(".next-btn");

  function loadPage(index) {
    fetch(pages[index])
      .then((response) => response.text())
      .then((data) => {
        pageContent.innerHTML = data;
      })
      .catch((error) => {
        pageContent.innerHTML = "<p>Error loading page.</p>";
        console.error("Error loading page:", error);
      });
  }

  // Load first page on startup
  loadPage(currentIndex);

  //   nextBtn.addEventListener("click", function () {
  //     if (currentIndex < pages.length - 1) {
  //       currentIndex++;
  //       loadPage(currentIndex);
  //     }
  //   });

  //   prevBtn.addEventListener("click", function () {
  //     if (currentIndex > 0) {
  //       currentIndex--;
  //       loadPage(currentIndex);
  //     }
  //   });
});
