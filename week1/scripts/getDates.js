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

    // Ensure menu is visible on large screens
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mainNav.classList.remove('hidden');
        }
    });

    // Dark mode toggle with persistence
    const applyDarkMode = (isDark) => {
        const elements = [document.body, document.querySelector('header'), document.querySelector('nav'), document.querySelector('footer')];
        elements.forEach(el => el.classList.toggle('dark-mode', isDark));
        document.querySelectorAll('.card').forEach(card => card.classList.toggle('dark-mode', isDark));
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        darkModeToggle.setAttribute('aria-pressed', isDark);
    };

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    applyDarkMode(isDarkMode);

    darkModeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        applyDarkMode(isDark);
    });
});
