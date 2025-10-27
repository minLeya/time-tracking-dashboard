fetch("assets/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("data is loaded");

    let currentPeriod = "weekly";
    updateDashboard(data, currentPeriod);

    const buttons = document.querySelectorAll(".period-toggle-button");

    document
      .querySelector(".period-toggle-button.weekly")
      .classList.add("active");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("daily")) currentPeriod = "daily";
        if (button.classList.contains("weekly")) currentPeriod = "weekly";
        if (button.classList.contains("monthly")) currentPeriod = "monthly";

        buttons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");

        updateDashboard(data, currentPeriod);
      });
    });
  })
  .catch((err) => {
    console.error("json download error: " + err);
  });

function updateDashboard(data, period) {
  data.forEach((element) => {
    const labels = {
      daily: "Yesterday",
      weekly: "Week",
      monthly: "Month",
    };

    const title = element.title.toLowerCase().replace(" ", "-");
    const card = document.querySelector(`.dashboard-card.${title}`);

    if (!card) return;

    const hours = card.querySelector(".hours");
    const previous = card.querySelector(".previous");

    const currentData = element.timeframes[period].current;
    const previousData = element.timeframes[period].previous;

    hours.textContent = `${currentData}hrs`;
    if (period === "daily") {
      previous.textContent = `${labels[period]} - ${previousData}hrs`;
    } else {
      previous.textContent = `Last ${labels[period]} - ${previousData}hrs`;
    }
  });
}
