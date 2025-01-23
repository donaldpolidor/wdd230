document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set year and last modified date/time
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;

    // Extract and format the last modified time
    const lastModifiedTime = new Date(document.lastModified).toLocaleString();
    document.getElementById("lastModifiedTime").textContent = "Last Modified Time: " + lastModifiedTime;

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
            mainNav.classList.remove('hidden'); 
            hamburgerMenu.style.display = 'none'; 
        } else {
            mainNav.classList.add('hidden'); 
            hamburgerMenu.style.display = 'block'; 
        }
    });

    // Initial check on page load
    if (window.innerWidth < 768) {
        mainNav.classList.add('hidden'); 
        hamburgerMenu.style.display = 'block'; 
    } else {
        mainNav.classList.remove('hidden'); 
        hamburgerMenu.style.display = 'none'; 
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
