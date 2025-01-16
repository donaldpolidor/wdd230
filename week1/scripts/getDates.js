// Set the current year dynamically
document.getElementById("year").textContent = new Date().getFullYear();

// Set the last modified date
document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;

document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set year and last modified date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;

    // Variables
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainNav = document.getElementById('mainNav');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Hamburger menu toggle
    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('hidden');
        hamburgerMenu.textContent = mainNav.classList.contains('hidden') ? '☰' : '✖';
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
