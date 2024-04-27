// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
}

// Function to get a cookie value
function getCookie(name) {
  const keyValue = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}

/* Toggle style switcher */
const styleSwicherToggle = document.querySelector(".style-switcher-toggler");
styleSwicherToggle.addEventListener("click", () => {
  document.querySelector(".style-switcher").classList.toggle("open");
});

// hide style switcher on scroll
window.addEventListener("scroll", () => {
  if (document.querySelector(".style-switcher").classList.contains("open")) {
    document.querySelector(".style-switcher").classList.remove("open");
  }
});

/* Theme colors */
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
  setCookie("selectedColor", color, 180);
}
/* Theme Mode dark and light */
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
  dayNight.querySelector("i").classList.toggle("fa-sun");
  dayNight.querySelector("i").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");

  const themeMode = document.body.classList.contains("dark") ? "dark" : "light";
  setCookie("themeMode", themeMode, 180);
});

window.addEventListener("load", () => {
  const themeMode = getCookie("themeMode");
  if (themeMode === "dark") {
    document.body.classList.add("dark");
    dayNight.querySelector("i").classList.add("fa-sun");
  } else {
    document.body.classList.remove("dark");
    dayNight.querySelector("i").classList.add("fa-moon");
  }
  const selectedColor = getCookie("selectedColor");
  if (selectedColor) {
    setActiveStyle(selectedColor);
  }
});