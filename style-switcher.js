// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}

// Function to get a cookie value
function getCookie(name) {
    const keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
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
}

/* Theme Mode dark and light */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector('i').classList.toggle("fa-sun");
    dayNight.querySelector('i').classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
    const themeMode = document.body.classList.contains("dark") ? "dark" : "light";
    setCookie("themeMode", themeMode, 180);
});

/* Theme Colors */
const colorButtons = document.querySelectorAll(".color");
colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        setActiveStyle(color);
        setCookie("themeColor", color, 180);
    });
});

window.addEventListener("load", () => {
    // Retrieve theme mode preference from cookie
    const themeMode = getCookie("themeMode");
    if (themeMode === "dark") {
        document.body.classList.add("dark");
        dayNight.querySelector('i').classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark");
        dayNight.querySelector('i').classList.add("fa-moon");
    }

    // Retrieve selected theme color from cookie
    const themeColor = getCookie("themeColor");
    if (themeColor) {
        setActiveStyle(themeColor);
    }
});
