// Set the current year dynamically
document.getElementById("year").textContent = new Date().getFullYear();

// Set the last modified date
document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainNav = document.getElementById('mainNav');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Toggle hamburger menu visibility
    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('hidden');
        hamburgerMenu.textContent = mainNav.classList.contains('hidden') ? '☰' : '✖';
    });

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
