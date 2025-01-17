document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set year and last modified date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;

    // Variables
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainNav = document.getElementById('mainNav');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Hamburger menu toggle
    const toggleMenu = () => {
        const isHidden = mainNav.classList.contains('hidden');
        mainNav.classList.toggle('hidden', !isHidden);
        hamburgerMenu.textContent = isHidden ? '✖' : '☰';
    };

    hamburgerMenu.addEventListener('click', toggleMenu);

    // Ensure menu is hidden on resize to large screens
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mainNav.classList.remove('hidden'); // Show nav for larger screens
            hamburgerMenu.style.display = 'none'; // Hide hamburger button
        } else {
            mainNav.classList.add('hidden'); // Hide nav for smaller screens
            hamburgerMenu.style.display = 'block'; // Show hamburger button
        }
    });

    // Initial check on page load
    if (window.innerWidth < 768) {
        mainNav.classList.add('hidden'); // Ensure nav is hidden on smaller screens
        hamburgerMenu.style.display = 'block'; // Show hamburger button
    } else {
        mainNav.classList.remove('hidden'); // Show nav on larger screens
        hamburgerMenu.style.display = 'none'; // Hide hamburger button
    }

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
