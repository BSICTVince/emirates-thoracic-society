
document.addEventListener("DOMContentLoaded", function () {

    // fade-in-up Animation (JavaScript)
    // This script applies a fade-in-up animation to elements with the class 'fade-in-up'
    // when they come into view as the user scrolls down the page.
    const elements = document.querySelectorAll(".fade-in-up");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Only trigger once
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    elements.forEach((el) => observer.observe(el));


    // Handle dropdown submenu behavior on mobile devices:
// - Enables tap-to-toggle for dropdown submenus
// - Closes all unrelated open dropdowns
// - Prevents auto-close when interacting with nested items
// - Applies only for mobile screens (< 992px)

function isMobile() {
    return window.innerWidth < 992;
}

const submenuToggles = document.querySelectorAll(".submenu-toggle");

submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
        if (isMobile()) {
            e.preventDefault();

            const parentLi = this.parentElement;

            // Close ALL open dropdowns EXCEPT the ancestors of the clicked toggle
            document.querySelectorAll(".dropdown-submenu-open").forEach((openLi) => {
                if (!parentLi.contains(openLi) && openLi !== parentLi) {
                    openLi.classList.remove("dropdown-submenu-open");
                }
            });

            // Toggle only the current clicked submenu
            parentLi.classList.toggle("dropdown-submenu-open");
        }
    });
});

// Prevent Bootstrap from closing dropdowns on inner clicks
document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    menu.addEventListener("click", function (e) {
        if (isMobile()) {
            e.stopPropagation();
        }
    });
});

// Close all open dropdowns when clicking outside
document.addEventListener("click", function (e) {
    if (isMobile()) {
        if (!e.target.closest(".dropdown")) {
            document.querySelectorAll(".dropdown-submenu-open").forEach((openLi) => {
                openLi.classList.remove("dropdown-submenu-open");
            });
        }
    }
});

});
