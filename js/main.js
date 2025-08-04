// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
const navbar = document.getElementById("navScroll");
window.addEventListener("scroll", function() {
    if (window.scrollY > 5) {
        navbar.classList.add("navScroll");
    } else {
        navbar.classList.remove("navScroll");
    }
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const anchorLinks = document.querySelectorAll(".nav-links a");

hamburger.addEventListener('click', () => {
    // Animate Links
    navbar.classList.remove("navScroll");
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    // Hamburger Animation
    hamburger.classList.toggle("toggle");
});

// Close navbar when an anchor link is clicked
anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', () => {
        navLinks.classList.remove("open");
        links.forEach(link => {
            link.classList.remove("fade");
        });
        hamburger.classList.remove("toggle");
    });
});

const buttonsComponent = document.querySelector('.buttons');
const buttonsToggle = document.querySelector('.buttons__toggle');

buttonsToggle.addEventListener('click', toggleButtons);

function toggleButtons() {
	buttonsToggle.classList.toggle('buttons__toggle--active');
	buttonsComponent.classList.toggle('buttons--active');
	document.activeElement.blur();
}
