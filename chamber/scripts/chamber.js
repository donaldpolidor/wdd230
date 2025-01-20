document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector("nav ul");

    hamburger.addEventListener("click", () => {
        menu.classList.toggle("show");
    });

    // Dynamically update the year and last modified date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;
});
