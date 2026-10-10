
"use strict";

// Update footer year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Light and dark theme toggle
const themeButton = document.getElementById("theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", function () {
        const isDark = document.body.classList.toggle("dark-theme");

        themeButton.setAttribute("aria-pressed", String(isDark));

        if (isDark) {
            themeButton.textContent = "☀️ Light Mode";
            themeButton.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        } else {
            themeButton.textContent = "🌙 Dark Mode";
            themeButton.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    });
}

// Contact form validation
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();

        formStatus.textContent =
            "Thank you, " + name +
            "! Your form has been validated successfully. " +
            "This demo does not send or store messages.";

        contactForm.reset();
    });
}
